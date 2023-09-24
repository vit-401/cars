
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/": {
        "get": {
          "operationId": "AppController_getHello",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/cars": {
        "get": {
          "operationId": "CarsController_findAll",
          "summary": "Retrieve a list of cars with pagination",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number",
              "example": 1,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "example": 10,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved list of cars",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/Car"
                            }
                          },
                          "page": {
                            "type": "number"
                          },
                          "limit": {
                            "type": "number"
                          },
                          "totalPages": {
                            "type": "number"
                          },
                          "totalItems": {
                            "type": "number"
                          }
                        }
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        "post": {
          "operationId": "CarsController_createOne",
          "summary": "Create a new car",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCarDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Car"
                  }
                }
              }
            }
          }
        }
      },
      "/cars/{id}": {
        "get": {
          "operationId": "CarsController_findOne",
          "summary": "Retrieve a car by ID",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "ID of the car",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Car"
                  }
                }
              }
            },
            "404": {
              "description": "Car not found"
            }
          }
        },
        "put": {
          "operationId": "CarsController_update",
          "summary": "Update a car by ID",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "ID of the car",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateCarDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Car"
                  }
                }
              }
            },
            "404": {
              "description": "Car not found"
            }
          }
        },
        "delete": {
          "operationId": "CarsController_deleteOne",
          "summary": "Delete a car by ID",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "ID of the car",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Deleted successfully. Return Boolean",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/"
                  }
                }
              }
            },
            "404": {
              "description": "Car not found"
            }
          }
        }
      }
    },
    "info": {
      "title": "Cars example",
      "description": "The cats API description",
      "version": "1.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "cars",
        "description": ""
      }
    ],
    "servers": [],
    "components": {
      "schemas": {
        "Car": {
          "type": "object",
          "properties": {
            "brand": {
              "type": "string"
            },
            "car_number": {
              "type": "string"
            },
            "model": {
              "type": "string"
            },
            "engine_type": {
              "type": "string"
            }
          },
          "required": [
            "brand",
            "car_number",
            "model",
            "engine_type"
          ]
        },
        "CreateCarDto": {
          "type": "object",
          "properties": {
            "brand": {
              "type": "string"
            },
            "car_number": {
              "type": "string"
            },
            "model": {
              "type": "string"
            },
            "engine_type": {
              "type": "string"
            }
          },
          "required": [
            "brand",
            "car_number",
            "model",
            "engine_type"
          ]
        },
        "UpdateCarDto": {
          "type": "object",
          "properties": {
            "brand": {
              "type": "string"
            },
            "car_number": {
              "type": "string"
            },
            "model": {
              "type": "string"
            },
            "engine_type": {
              "type": "string"
            }
          },
          "required": [
            "brand",
            "car_number",
            "model",
            "engine_type"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
