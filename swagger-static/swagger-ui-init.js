
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
          },
          "tags": [
            "hello world test"
          ]
        }
      },
      "/auth/me": {
        "get": {
          "operationId": "AuthController_getUserData",
          "summary": "Get User Data",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success"
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Auth"
          ],
          "security": [
            {
              "Auth": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/auth/login": {
        "post": {
          "operationId": "AuthController_login",
          "summary": "Login",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Logged in"
            }
          },
          "tags": [
            "Auth"
          ],
          "security": [
            {
              "Auth": []
            }
          ]
        }
      },
      "/auth/registration": {
        "post": {
          "operationId": "AuthController_registration",
          "summary": "User Registration",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RegistrationDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Registered successfully"
            },
            "400": {
              "description": "Bad Request"
            }
          },
          "tags": [
            "Auth"
          ],
          "security": [
            {
              "Auth": []
            }
          ]
        }
      },
      "/auth/registration-confirmation": {
        "post": {
          "operationId": "AuthController_confirmRegistration",
          "summary": "Confirm Registration",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Confirmation Code",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RegistrationConfirmationDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Email confirmed"
            },
            "404": {
              "description": "Not Found"
            }
          },
          "tags": [
            "Auth"
          ],
          "security": [
            {
              "Auth": []
            }
          ]
        }
      },
      "/auth/registration-email-resending": {
        "post": {
          "operationId": "AuthController_resendRegistrationEmail",
          "summary": "Resend Registration Email",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Email",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmailResendingDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Email resent"
            },
            "400": {
              "description": "Bad Request"
            }
          },
          "tags": [
            "Auth"
          ],
          "security": [
            {
              "Auth": []
            }
          ]
        }
      },
      "/auth/logout": {
        "post": {
          "operationId": "AuthController_logout",
          "summary": "Logout",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Logged out"
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Auth"
          ],
          "security": [
            {
              "Auth": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/auth/refresh-token": {
        "post": {
          "operationId": "AuthController_refreshToken",
          "summary": "Refresh Token",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Token refreshed"
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Auth"
          ],
          "security": [
            {
              "Auth": []
            },
            {
              "bearer": []
            }
          ]
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
          },
          "tags": [
            "Cars"
          ]
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
          },
          "tags": [
            "Cars"
          ]
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
          },
          "tags": [
            "Cars"
          ]
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
          },
          "tags": [
            "Cars"
          ]
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
          },
          "tags": [
            "Cars"
          ]
        }
      }
    },
    "info": {
      "title": "Cars test task app",
      "description": "Car API description",
      "version": "1.0",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "securitySchemes": {
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "LoginDto": {
          "type": "object",
          "properties": {
            "login": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "required": [
            "login",
            "password"
          ]
        },
        "RegistrationDto": {
          "type": "object",
          "properties": {
            "login": {
              "type": "string"
            },
            "password": {
              "type": "string"
            },
            "email": {
              "type": "string"
            }
          },
          "required": [
            "login",
            "password",
            "email"
          ]
        },
        "RegistrationConfirmationDto": {
          "type": "object",
          "properties": {
            "code": {
              "type": "string"
            }
          },
          "required": [
            "code"
          ]
        },
        "EmailResendingDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string"
            }
          },
          "required": [
            "email"
          ]
        },
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
