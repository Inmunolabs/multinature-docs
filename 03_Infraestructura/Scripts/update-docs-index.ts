#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';

interface FileItem {
  name: string;
  path: string;
  isDirectory: boolean;
  isMarkdown: boolean;
  numericPrefix?: number;
  customLabel?: string;
}

interface NonMarkdownItem {
  content: string;
  level: number;
  section: string;
  originalIndex: number;
}

interface Section {
  name: string;
  path: string;
  items: FileItem[];
  subSections: Section[];
}

class DocsIndexUpdater {
  private targetPaths = [
    'docs/README.md',
    'docs/1. Definicion del proyecto/README.md',
    'docs/2. BACKEND/README.md',
    'docs/3. FRONTEND/README.md',
    'docs/4. Negocio/README.md',
    'docs/5. PRUEBAS/README.md'
  ];

  private dryRun: boolean = false;
  private verbose: boolean = false;

  constructor() {
    this.parseArgs();
  }

  private parseArgs(): void {
    const args = process.argv.slice(2);
    this.dryRun = args.includes('--dry-run');
    this.verbose = args.includes('--verbose');
  }

  private log(message: string): void {
    if (this.verbose) {
      console.log(message);
    }
  }

  private extractNumericPrefix(name: string): number | undefined {
    const match = name.match(/^(\d+(?:\.\d+)*)/);
    if (match) {
      const parts = match[1].split('.').map(Number);
      return parts.reduce((acc, part, index) => acc + part * Math.pow(1000, parts.length - 1 - index), 0);
    }
    return undefined;
  }

  private formatTitle(filename: string): string {
    // Remove .md extension and convert to title case
    const name = filename.replace(/\.md$/, '');
    
    // Handle numeric prefixes
    const numericMatch = name.match(/^(\d+(?:\.\d+)*)\s*-\s*(.+)/);
    if (numericMatch) {
      const prefix = numericMatch[1];
      const title = numericMatch[2];
      return `${prefix} - ${this.toTitleCase(title)}`;
    }
    
    // Handle other patterns
    const cleanName = name.replace(/[-_]/g, ' ');
    return this.toTitleCase(cleanName);
  }

  private toTitleCase(str: string): string {
    const smallWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'];
    
    return str.split(' ')
      .map((word, index) => {
        const lowerWord = word.toLowerCase();
        if (index === 0 || !smallWords.includes(lowerWord)) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        return lowerWord;
      })
      .join(' ');
  }

  private scanDirectory(dirPath: string): FileItem[] {
    const items: FileItem[] = [];
    
    try {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.name === 'README.md') continue;
        
        const fullPath = path.join(dirPath, entry.name);
        const relativePath = path.relative(path.dirname(dirPath), fullPath);
        
        const item: FileItem = {
          name: entry.name,
          path: relativePath.replace(/\\/g, '/'), // Normalize to forward slashes
          isDirectory: entry.isDirectory(),
          isMarkdown: entry.name.endsWith('.md'),
          numericPrefix: this.extractNumericPrefix(entry.name)
        };
        
        items.push(item);
      }
    } catch (error) {
      this.log(`Error scanning directory ${dirPath}: ${error}`);
    }
    
    return items;
  }

  private sortItems(items: FileItem[]): FileItem[] {
    return items.sort((a, b) => {
      // First by numeric prefix if both have one
      if (a.numericPrefix !== undefined && b.numericPrefix !== undefined) {
        return a.numericPrefix - b.numericPrefix;
      }
      
      // Items with numeric prefixes come first
      if (a.numericPrefix !== undefined && b.numericPrefix === undefined) {
        return -1;
      }
      if (a.numericPrefix === undefined && b.numericPrefix !== undefined) {
        return 1;
      }
      
      // Then alphabetically
      return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
    });
  }

  private buildSectionStructure(dirPath: string, items: FileItem[]): Section[] {
    const sections: Section[] = [];
    const processedItems = new Set<string>();
    
    // First, create sections for directories
    for (const item of items) {
      if (item.isDirectory && !processedItems.has(item.name)) {
        const subDirPath = path.join(dirPath, item.name);
        const subItems = this.scanDirectory(subDirPath);
        
        if (subItems.length > 0) {
          const section: Section = {
            name: item.name,
            path: item.path,
            items: [],
            subSections: []
          };
          
          // Add markdown files from this subdirectory
          const markdownItems = subItems.filter(subItem => subItem.isMarkdown);
          section.items = this.sortItems(markdownItems);
          
          // Add sub-sections for nested directories
          const nestedDirs = subItems.filter(subItem => subItem.isDirectory);
          for (const nestedDir of nestedDirs) {
            const nestedPath = path.join(subDirPath, nestedDir.name);
            const nestedItems = this.scanDirectory(nestedPath);
            const nestedMarkdown = nestedItems.filter(nestedItem => nestedItem.isMarkdown);
            
            if (nestedMarkdown.length > 0) {
              section.subSections.push({
                name: nestedDir.name,
                path: nestedDir.path,
                items: this.sortItems(nestedMarkdown),
                subSections: []
              });
            }
          }
          
          sections.push(section);
          processedItems.add(item.name);
        }
      }
    }
    
    // Then add remaining markdown files at root level
    const rootMarkdown = items.filter(item => item.isMarkdown && !processedItems.has(item.name));
    if (rootMarkdown.length > 0) {
      sections.push({
        name: '',
        path: '',
        items: this.sortItems(rootMarkdown),
        subSections: []
      });
    }
    
    return sections;
  }

  private extractNonMarkdownItems(content: string): NonMarkdownItem[] {
    const nonMarkdownItems: NonMarkdownItem[] = [];
    const lines = content.split('\n');
    
    let inContentSection = false;
    let currentSection = '';
    let lineIndex = 0;
    
    for (const line of lines) {
      if (line.trim() === '## Contenido') {
        inContentSection = true;
        lineIndex++;
        continue;
      }
      
      if (inContentSection && line.startsWith('##')) {
        break; // End of content section
      }
      
      if (inContentSection && line.trim()) {
        // Check if it's a list item that doesn't point to .md
        const listMatch = line.match(/^(\s*)(\d+\.|[-*])\s*\[([^\]]+)\]([^.]*)$/);
        if (listMatch) {
          const indent = listMatch[1];
          const content = listMatch[3];
          const link = listMatch[4];
          
          // If it doesn't end with .md and doesn't look like a relative path to .md
          if (!link.includes('.md') && !link.startsWith('./') && !link.startsWith('../')) {
            const level = Math.floor(indent.length / 3);
            nonMarkdownItems.push({
              content: line.trim(),
              level,
              section: currentSection,
              originalIndex: lineIndex
            });
          }
        }
        
        // Track current section for non-list items
        const sectionMatch = line.match(/^(\d+\.|[-*])\s*([^:]+):/);
        if (sectionMatch) {
          currentSection = sectionMatch[2].trim();
        }
      }
      lineIndex++;
    }
    
    return nonMarkdownItems;
  }

  private generateMarkdownList(sections: Section[], level: number = 0): string[] {
    const lines: string[] = [];
    let itemNumber = 1;
    
    for (const section of sections) {
      if (section.name) {
        // Directory section
        const indent = '   '.repeat(level);
        lines.push(`${indent}${itemNumber}. [${this.formatTitle(section.name)}](./${section.path})`);
        
        // Add markdown files in this section
        if (section.items.length > 0) {
          for (const item of section.items) {
            const itemIndent = '   '.repeat(level + 1);
            const title = this.formatTitle(item.name);
            const encodedPath = encodeURI(item.path);
            const subNumber = this.getItemNumber(item);
            const displayNumber = subNumber ? `${itemNumber}.${subNumber}` : itemNumber;
            lines.push(`${itemIndent}${displayNumber} [${title}](./${encodedPath})`);
          }
        }
        
        // Add sub-sections
        for (const subSection of section.subSections) {
          const subIndent = '   '.repeat(level + 1);
          const subNumber = this.getSectionNumber(subSection);
          const displayNumber = subNumber ? `${itemNumber}.${subNumber}` : itemNumber;
          lines.push(`${subIndent}${displayNumber} [${this.formatTitle(subSection.name)}](./${subSection.path})`);
          
          for (const item of subSection.items) {
            const itemIndent = '   '.repeat(level + 2);
            const title = this.formatTitle(item.name);
            const encodedPath = encodeURI(item.path);
            const itemSubNumber = this.getItemNumber(item);
            const itemDisplayNumber = itemSubNumber ? `${displayNumber}.${itemSubNumber}` : displayNumber;
            lines.push(`${itemIndent}${itemDisplayNumber} [${title}](./${encodedPath})`);
          }
        }
        
        itemNumber++;
      } else {
        // Root level markdown files
        for (const item of section.items) {
          const indent = '   '.repeat(level);
          const title = this.formatTitle(item.name);
          const encodedPath = encodeURI(item.path);
          lines.push(`${indent}${itemNumber}. [${title}](./${encodedPath})`);
          itemNumber++;
        }
      }
    }
    
    return lines;
  }

  private getItemNumber(item: FileItem): string {
    if (item.numericPrefix !== undefined) {
      const parts = item.name.match(/^(\d+(?:\.\d+)*)/)?.[1];
      if (parts) {
        return parts.split('.').slice(1).map(n => n).join('.');
      }
    }
    return '';
  }

  private getSectionNumber(section: Section): string {
    const parts = section.name.match(/^(\d+(?:\.\d+)*)/)?.[1];
    if (parts) {
      return parts.split('.').slice(1).map(n => n).join('.');
    }
    return '';
  }

  private updateReadme(readmePath: string): 'unchanged' | 'updated' {
    try {
      const content = fs.readFileSync(readmePath, 'utf8');
      const dirPath = path.dirname(readmePath);
      
      // Extract non-markdown items to preserve
      const nonMarkdownItems = this.extractNonMarkdownItems(content);
      
      // Find the content section boundaries
      const contentStart = content.indexOf('## Contenido');
      if (contentStart === -1) {
        this.log(`No ## Contenido section found in ${readmePath}`);
        return 'unchanged';
      }
      
      const nextHeaderMatch = content.slice(contentStart).match(/\n## /);
      const contentEnd = nextHeaderMatch 
        ? contentStart + nextHeaderMatch.index! 
        : content.length;
      
      // Scan directory and build structure
      const items = this.scanDirectory(dirPath);
      const sections = this.buildSectionStructure(dirPath, items);
      
      // Generate new content
      const newContentLines = this.generateMarkdownList(sections);
      
      // Insert preserved non-markdown items at the end
      if (nonMarkdownItems.length > 0) {
        newContentLines.push(''); // Add empty line before non-markdown items
        for (const item of nonMarkdownItems) {
          const indent = '   '.repeat(item.level);
          const cleanContent = item.content.replace(/^\d+\.|[-*]\s*/, '');
          newContentLines.push(`${indent}${cleanContent}`);
        }
      }
      
      const newContent = newContentLines.join('\n');
      
      // Reconstruct the file
      const beforeContent = content.slice(0, contentStart + '## Contenido\n'.length);
      const afterContent = content.slice(contentEnd);
      
      const newFileContent = beforeContent + '\n' + newContent + afterContent;
      
      if (newFileContent === content) {
        return 'unchanged';
      }
      
      if (!this.dryRun) {
        fs.writeFileSync(readmePath, newFileContent, 'utf8');
      }
      
      return 'updated';
    } catch (error) {
      this.log(`Error updating ${readmePath}: ${error}`);
      return 'unchanged';
    }
  }

  public run(): void {
    console.log('🔍 Actualizando índices de README.md...');
    if (this.dryRun) {
      console.log('📝 Modo dry-run: no se realizarán cambios');
    }
    
    const results: { path: string; status: 'unchanged' | 'updated' }[] = [];
    
    for (const readmePath of this.targetPaths) {
      if (fs.existsSync(readmePath)) {
        this.log(`\n📖 Procesando: ${readmePath}`);
        const status = this.updateReadme(readmePath);
        results.push({ path: readmePath, status });
        console.log(`   ${status === 'updated' ? '✅' : '⏭️'} ${status}`);
      } else {
        console.log(`❌ No encontrado: ${readmePath}`);
      }
    }
    
    console.log('\n📊 Resumen:');
    const updated = results.filter(r => r.status === 'updated').length;
    const unchanged = results.filter(r => r.status === 'unchanged').length;
    
    console.log(`   ✅ Actualizados: ${updated}`);
    console.log(`   ⏭️ Sin cambios: ${unchanged}`);
    
    if (this.dryRun && updated > 0) {
      console.log('\n💡 Ejecuta sin --dry-run para aplicar los cambios');
    }
  }
}

// Run the updater
const updater = new DocsIndexUpdater();
updater.run();
