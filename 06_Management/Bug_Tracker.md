# Bug Tracker

### ✅ BUG-001 Error al crear alimentos desde el POST de una dieta propuesta por el DietAgent

- **Context:** Al crear una dieta desde la propuesta de dieta del Agente de Dietas falla la creación de nuevos alimentos

- **Estimación:** 5h

- **Assignee:** Antoine Ganem

- **Tags:** back

### ✅ BUG-002 Error de timed out durante envio de correos

- **Context:**

  Error:

  ```
  2025-12-10T19:34:41.049Z d6f0fee0-ca2e-41e2-b83a-cdf37cbfc3df ERROR 📩 🡪 [emails-layer],[sendEmailsByNodemailerTransport()] ❌ Nodemailer SendEmail failed: Error: connect ETIMEDOUT 142.250.31.109:587 at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1637:16) {
    errno: -110,
    code: 'ESOCKET',
    syscall: 'connect',
    address: '142.250.31.109',
    port: 587,
    command: 'CONN'
  }
  ```

  - Apoyarse de Samuel Reveles para cualquier tema relacionado con la VPN, las subnets, o todo lo que tenga que ver con la infraestructura del proyecto

- **Estimación:** 6h

- **Assignee:** Antoine Ganem

- **Tags:** back
