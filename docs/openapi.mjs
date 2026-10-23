const producto = {
  type: 'object',
  properties: {
    id: { type: 'integer', example: 1 },
    nombre: { type: 'string', example: 'Alimento Perro Adulto' },
    imagen: { type: 'string', example: './recursos/imagenes/ALIMENTO PERRO.jpg' },
    precio: { type: 'number', example: 15000 },
    categoria: { type: 'string', enum: ['alimentos', 'accesorios', 'higiene', 'salud', 'juguetes'] },
    marca: { type: 'string', example: 'Royal Canin' },
    descripcion: { type: 'string' },
    peso: { type: 'string', example: '15 kg' },
    sabor: { type: 'string', example: 'Pollo y arroz' },
    para: { type: 'string', example: 'perros adultos' }
  }
}
const productoentrada = {
  ...producto,
  required: ['nombre', 'precio', 'categoria'],
  properties: Object.fromEntries(Object.entries(producto.properties).filter(([k]) => k !== 'id'))
}
const error = { description: 'Error', content: { 'application/json': { schema: { $ref: '#/components/schemas/error' } } } }
const idparam = { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
const json = (schema) => ({ 'application/json': { schema } })

export default {
  openapi: '3.0.3',
  info: { title: 'API Huellas & Cia', version: '1.0.0', description: 'CRUD de productos del petshop.' },
  servers: [{ url: '/' }],
  tags: [{ name: 'Productos' }],
  paths: {
    '/api/v1/productos': {
      get: {
        tags: ['Productos'], summary: 'Listar productos (lectura publica, CORS abierto)',
        parameters: [
          { name: 'categoria', in: 'query', schema: { type: 'string' } },
          { name: 'q', in: 'query', description: 'Busca en nombre y marca', schema: { type: 'string' } }
        ],
        responses: { 200: { description: 'Lista', content: json({ type: 'array', items: { $ref: '#/components/schemas/producto' } }) } }
      },
      post: {
        tags: ['Productos'], summary: 'Alta de producto',
        requestBody: { required: true, content: json({ $ref: '#/components/schemas/productoentrada' }) },
        responses: { 201: { description: 'Creado', content: json({ $ref: '#/components/schemas/producto' }) }, 400: error }
      }
    },
    '/api/v1/productos/{id}': {
      get: {
        tags: ['Productos'], summary: 'Obtener un producto (lectura publica, CORS abierto)', parameters: [idparam],
        responses: { 200: { description: 'Producto', content: json({ $ref: '#/components/schemas/producto' }) }, 400: error, 404: error }
      },
      put: {
        tags: ['Productos'], summary: 'Modificar un producto', parameters: [idparam],
        requestBody: { required: true, content: json({ $ref: '#/components/schemas/productoentrada' }) },
        responses: { 200: { description: 'Actualizado', content: json({ $ref: '#/components/schemas/producto' }) }, 400: error, 404: error }
      },
      delete: {
        tags: ['Productos'], summary: 'Baja de un producto', parameters: [idparam],
        responses: { 204: { description: 'Eliminado' }, 400: error, 404: error }
      }
    }
  },
  components: {
    schemas: {
      producto: producto,
      productoentrada: productoentrada,
      error: { type: 'object', properties: { mensaje: { type: 'string' }, errores: { type: 'array', items: { type: 'string' } } } }
    }
  }
}
