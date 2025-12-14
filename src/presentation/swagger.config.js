const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Documentation for the API',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 8080}/api/v1`,
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '60c72b2f9b1e8a001f8e4caa00'
          },
          name: {
            type: 'string',
            example: 'John Doe'
          },
          email: {
            type: 'string',
            example: 'jhon.doe@example.com'
          },
          roles: {
            type: 'array',
            items: {
              type: 'string'
            },
            example: ['user']
          }
        }
      },
      UserInput: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'John Doe'
          },
          email: {
            type: 'string',
            example: 'jhon.doe@exmaple.com'
          },
          password: {
            type: 'string',
            example: 'password123'
          },
          roles: {
            type: 'array',
            items: {
              type: 'string'
            },
            example: ['user']
          }
        }
      },  
      Role: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '60c72b2f9b1e8a001f8e4caa'
          },
          name: {
            type: 'string',
            example: 'Admin'
          }
        }
      },
      RoleInput: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Admins'
          }
        }
      },
      Product: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '60c72b2f9b1e8a001f8e4caa00'
          },
          name: {
            type: 'string',
            example: 'Producto Nuevo'
          },
          description: {
            type: 'string',
            example: 'producto nuevo china'
          },
          price: {
            type: 'integer',
            example: '50'
          },
          stock: {
            type: 'integer',
            example: '5'
          },
          category: {
            type: 'string',
            example: 'A'
          },
          imageUrl: {
            type: 'string',
            example: './link'
          }          
        }
      },
      ProductInput: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Producto Nuevo'
          },
          description: {
            type: 'string',
            example: 'producto nuevo china'
          },
          price: {
            type: 'integer',
            example: '50'
          },
          stock: {
            type: 'integer',
            example: '5'
          },
          category: {
            type: 'string',
            example: 'A'
          },
          imageUrl: {
            type: 'string',
            example: './link'
          }       
        }
      },
      Auth: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '60c72b2f9b1e8a001f8e4caa00'
          },
          email: {
            type: 'string',
            example: 'jhon.doe@example.com'
          },
          password: {
            type: 'string',
            example: 'password00'
          }          
        }
      },
      Order: {
        type: 'object',
        properties: {
		      id: {
            type: 'string',
            example: '60c72b2f9b1e8a001f8e4caa'
          },
          orderNumber: {
            type: 'integer',
            example: '100'
          },
          userId: {
            type: 'integer',
            example: '52'
          },
          creationDate: {
            type: 'string',
            example: '2025/12/20'
          },
          updateDate: {
            type: 'string',
            example: '2026/12/20'
          },
          status: {
            type: 'string',
            example: 'NEW(N), PAID(P), CANCELLED(C)'
          },
          totalAmount: {
            type: 'integer',
            example: '150.30'
          }
        },
      },
      OrdeInput: {
        type: 'object',
        properties: {
          orderNumber: {
            type: 'integer',
            example: '100'
          },
          userId: {
            type: 'integer',
            example: '52'
          },
          creationDate: {
            type: 'string',
            example: '2025/12/20'
          },
          updateDate: {
            type: 'string',
            example: '2026/12/20'
          },
          status: {
            type: 'string',
            example: 'NEW(N), PAID(P), CANCELLED(C)'
          },
          totalAmount: {
            type: 'integer',
            example: '150.30'
          }
        }
      },
      Cupon: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '60c72b2f9b1e8a001f8e4ca1'
          },
          code: {
            type: 'integer',
            example: '001234'
          },
          description: {
            type: 'string',
            example: 'Descripcion del Cupon Alasita'
          },
          discountPercentage: {
            type: 'integer',
            example: 'Porcentaje de Descuento'
          },
          validFrom: {
            type: 'string',
            example: '2025/12/01'
          },
          validUntil: {
            type: 'string',
            example: '2025/12/30'
          }
        }
      },
      CuponInput: {
        type: 'object',
        properties: {          
          code: {
            type: 'integer',
            example: '001234'
          },
          description: {
            type: 'string',
            example: 'Descripcion del Cupon Alasita'
          },
          discountPercentage: {
            type: 'integer',
            example: 'Porcentaje de Descuento'
          },
          validFrom: {
            type: 'string',
            example: '2025/12/01'
          },
          validUntil: {
            type: 'string',
            example: '2025/12/30'
          }
        }
      } 
    },    
  },
  security: [{
    bearerAuth: []
  }]
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/presentation/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
