const axios = require('axios');
const config = require('./config');

class PipefyService {
    constructor() {
        this.apiToken = config.pipefy.apiToken;
        this.pipeId = config.pipefy.pipeId;
        this.baseURL = 'https://api.pipefy.com/graphql';

        this.headers = {
            'Authorization': `Bearer ${this.apiToken}`,
            'Content-Type': 'application/json'
        };
    }

    async makeGraphQLQuery(query, variables = {}) {
        try {
            // Se for mock token, retornar dados mock
            if (this.apiToken === 'mock_token') {
                return this.getMockData();
            }

            const response = await axios.post(this.baseURL, {
                query,
                variables
            }, { headers: this.headers });

            return response.data;
        } catch (error) {
            console.error('Erro na requisição Pipefy:', error.response?.data || error.message);
            // Retornar mock em caso de erro
            return this.getMockData();
        }
    }

    getMockData() {
        return {
            data: {
                pipe: {
                    name: "Pipe Villares Imóveis - MOCK",
                    phases: [
                        {
                            name: "Cliente Ativo",
                            cards: {
                                edges: [
                                    {
                                        node: {
                                            id: "card_1",
                                            title: "João Silva - Casa Centro",
                                            fields: [
                                                { name: "nome_completo", value: "João da Silva" },
                                                { name: "cpf", value: "123.456.789-00" },
                                                { name: "endereco", value: "Rua das Flores, 123 - Centro" },
                                                { name: "valor", value: "250.000,00" },
                                                { name: "tipo_imovel", value: "Casa" },
                                                { name: "telefone", value: "(35) 99999-9999" },
                                                { name: "email", value: "joao@email.com" }
                                            ]
                                        }
                                    },
                                    {
                                        node: {
                                            id: "card_2",
                                            title: "Maria Santos - Apto Jardim",
                                            fields: [
                                                { name: "nome_completo", value: "Maria Santos" },
                                                { name: "cpf", value: "987.654.321-00" },
                                                { name: "endereco", value: "Av. Principal, 456 - Jardim" },
                                                { name: "valor", value: "180.000,00" },
                                                { name: "tipo_imovel", value: "Apartamento" },
                                                { name: "telefone", value: "(35) 98888-8888" },
                                                { name: "email", value: "maria@email.com" }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        };
    }

    async getPipeStructure() {
        const query = `
            query {
                pipe(id: "${this.pipeId}") {
                    name
                    phases {
                        name
                        fields {
                            name
                            label
                            type
                        }
                    }
                }
            }
        `;

        const result = await this.makeGraphQLQuery(query);
        return result.data.pipe;
    }

    async getActiveClientsCards() {
        const query = `
            query {
                pipe(id: "${this.pipeId}") {
                    phases {
                        name
                        cards {
                            edges {
                                node {
                                    id
                                    title
                                    fields {
                                        name
                                        value
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;

        const result = await this.makeGraphQLQuery(query);

        // Encontrar a fase "Cliente Ativo"
        const activePhase = result.data.pipe.phases.find(phase =>
            phase.name.toLowerCase().includes('ativo') ||
            phase.name.toLowerCase().includes('active')
        );

        if (!activePhase) {
            return this.formatMockCards();
        }

        return activePhase.cards.edges.map(edge => ({
            id: edge.node.id,
            title: edge.node.title,
            fields: this.formatFields(edge.node.fields)
        }));
    }

    async getCardById(cardId) {
        const query = `
            query GetCard($id: ID!) {
                card(id: $id) {
                    id
                    title
                    fields {
                        name
                        value
                    }
                }
            }
        `;

        const result = await this.makeGraphQLQuery(query, { id: cardId });

        if (result.data && result.data.card) {
            return {
                id: result.data.card.id,
                title: result.data.card.title,
                fields: this.formatFields(result.data.card.fields)
            };
        }

        // Retornar mock se não encontrar
        return this.formatMockCards()[0];
    }

    formatFields(fields) {
        const formatted = {};
        fields.forEach(field => {
            formatted[field.name] = field.value;
        });
        return formatted;
    }

    formatMockCards() {
        const mockData = this.getMockData();
        const cards = mockData.data.pipe.phases[0].cards.edges;

        return cards.map(edge => ({
            id: edge.node.id,
            title: edge.node.title,
            fields: this.formatFields(edge.node.fields)
        }));
    }
}

module.exports = new PipefyService();