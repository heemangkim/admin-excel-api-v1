module.exports = {
    openapi: '3.0.0',
    info: {
        title: "Node Express API with Swagger",
        version: "0.0.1",
        description:
            "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        },
    },
    servers: [
        {
            url: "http://localhost:3000/",
            description: 'Local Server',
        },
    ],
    paths: {
        '/v1/public-excel-file-sync': {
            post: {
                description: '공개 엑셀 파일 다운로드',
                operationId: 'public-excel-file-sync',
                parameters: [
                    {
                        "name": "fileName",
                        "in": 'body',
                        "description": "엑셀 파일명",
                        "schema": {
                            "$ref": "#/components/schemas/fileName"
                    },
                    required: true
                    },
                    {
                        "name": "headers",
                        "in": 'body',
                        "description": "엑셀 헤더리스트",
                        "schema": {
                            "$ref": "#/components/schemas/headers"
                        },
                        required: true
                    },
                    {
                        "name": "contents",
                        "in": 'body',
                        "description": "엑셀 내용 리스트",
                        "schema": {
                            "$ref": "#/components/schemas/contents"
                        },
                        required: true
                    },
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/PublicExcel'
                            },
                            required: true,
                        }
                    },
                },
                responses: {
                    '201': {
                        description: '파일 생성 완료',
                        content: {
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
                                schema: {
                                    $ref: '#/components/schemas/ExcelSuccess'
                                },
                            }
                        }
                    }
                }
            }
        },
        '/v1/protect-excel-file-sync': {
            post: {
                description: '비공개 엑셀 파일 다운로드',
                operationId: 'protect-excel-file-sync',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ProtectExcel'
                            },
                            required: true,
                        }
                    },
                },
            }
        }
    },
    components: {
        schemas: {
            fileName: {
                type: 'string',
                description: '엑셀 파일 이름',
                example: '상품관리_전체상품_220501',
            },
            headers: {
                type: 'array',
                description: '엑셀 헤더 리스트',
                example: "['header-A1', 'header-B1', 'header-C1']"
            },
            contents: {
                type: 'array',
                description: '엑셀 행 리스트',
                example: "[" +
                    "{'content-A2', 'content-B2', 'content-C2'}," +
                    "{'content-A3', 'content-B3', 'content-C3'}," +
                    "{'content-A4', 'content-B4', 'content-C4'}" +
                    "]"
            },
            password: {
                type: 'string',
                description: '암호화된 패스워드',
            },
            PublicExcel: {
                type: 'object',
                properties: {
                    fileName: {
                        $ref: '#/components/schemas/fileName'
                    },
                    headers: {
                        $ref: '#/components/schemas/headers'
                    },
                    contents: {
                        $ref: '#/components/schemas/contents'
                    },
                }
            },
            ProtectExcel: {
                type: 'object',
                properties: {
                    fileName: {
                        $ref: '#/components/schemas/fileName'
                    },
                    headers: {
                        $ref: '#/components/schemas/headers'
                    },
                    contents: {
                        $ref: '#/components/schemas/contents'
                    },
                    password: {
                        $ref: '#/components/schemas/password'
                    },
                }
            },
            ExcelSuccess: {
                type: 'object',
                properties: {
                    result: {
                        type: 'boolean'
                    },
                    data: {
                        type: 'binary'
                    }
                }

            }
        }
    }
};
