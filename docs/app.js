// app.js - VERSÃO COMPLETA COM FRASES DA INTERNET + LINKS EXTERNOS + PIPEFY
console.log('🚀 Sistema Villares');

class App {
    constructor() {
        this.currentUser = 'Usuário';
        this.currentPage = 'dashboard';
        this.init();
    }

    async init() {
        this.checkAuth();
        this.updateUserDisplay();
        await this.testBackendConnection();
        this.checkSystemStatus();
        this.carregarLinksExternos();
        await this.carregarFraseInternet();
    }

    // FUNÇÃO PRINCIPAL - BUSCAR FRASE DA INTERNET EM PORTUGUÊS
    async carregarFraseInternet() {
        console.log('🌐 Buscando frase motivacional da internet...');
        
        try {
            const frase = await this.buscarFraseAPI1();
            if (frase) {
                this.exibirFrase(frase);
                return;
            }
        } catch (error) {
            console.log('❌ API 1 falhou:', error);
        }

        try {
            const frase = await this.buscarFraseAPI2();
            if (frase) {
                this.exibirFrase(frase);
                return;
            }
        } catch (error) {
            console.log('❌ API 2 falhou:', error);
        }

        this.carregarFraseLocal();
    }

    async buscarFraseAPI1() {
        try {
            const response = await fetch('https://api.quotable.io/random?maxLength=100');
            if (response.ok) {
                const data = await response.json();
                const fraseIngles = `${data.content} - ${data.author}`;
                const frasePT = await this.traduzirParaPortugues(fraseIngles);
                return frasePT;
            }
        } catch (error) {
            throw error;
        }
        return null;
    }

    async buscarFraseAPI2() {
        try {
            const response = await fetch('https://zenquotes.io/api/random');
            if (response.ok) {
                const data = await response.json();
                if (data && data[0]) {
                    const fraseIngles = `${data[0].q} - ${data[0].a}`;
                    const frasePT = await this.traduzirParaPortugues(fraseIngles);
                    return frasePT;
                }
            }
        } catch (error) {
            throw error;
        }
        return null;
    }

    async traduzirParaPortugues(fraseIngles) {
        const traducoes = {
            "The only way to do great work is to love what you do.": "O único modo de fazer um excelente trabalho é amar o que você faz.",
            "Innovation distinguishes between a leader and a follower.": "A inovação distingue um líder de um seguidor.",
            "Your time is limited, don't waste it living someone else's life.": "Seu tempo é limitado, não o perca vivendo a vida de outra pessoa.",
            "The future belongs to those who believe in the beauty of their dreams.": "O futuro pertence àqueles que acreditam na beleza de seus sonhos.",
            "The way to get started is to quit talking and begin doing.": "O modo de começar é parar de falar e começar a fazer.",
            "Don't let yesterday take up too much of today.": "Não deixe o ontem ocupar muito do hoje.",
            "It's not whether you get knocked down, it's whether you get up.": "Não importa se você caiu, importa se você se levanta.",
            "The only limit to our realization of tomorrow will be our doubts of today.": "O único limite para nossa realização de amanhã serão nossas dúvidas de hoje.",
            "Life is what happens to you while you're busy making other plans.": "A vida é o que acontece com você enquanto você está ocupado fazendo outros planos.",
            "The purpose of our lives is to be happy.": "O propósito de nossas vidas é ser feliz."
        };

        if (traducoes[fraseIngles.split(' - ')[0]]) {
            return traducoes[fraseIngles.split(' - ')[0]];
        }

        return this.obterFraseLocal();
    }

    obterFraseLocal() {
        const frases = [
            "🎯 Foco, força e fé! Cada cliente é uma nova oportunidade.",
            "💪 O sucesso é a soma de pequenos esforços repetidos dia após dia.",
            "🚀 Não basta sonhar, é preciso agir! Venda mais hoje!",
            "⭐ Seja a estrela que guia seus clientes para o imóvel perfeito.",
            "📈 Suas metas estão mais perto do que você imagina!",
            "🤝 Relacionamento é tudo! Conquiste a confiança do cliente.",
            "🏆 Você é um campeão! Mostre seu potencial hoje!",
            "✨ A persistência transforma dificuldades em conquistas!",
            "🎉 Cada negócio fechado é uma vitória compartilhada!",
            "🌅 Novo dia, novas oportunidades! Vamos em frente!"
        ];

        const hoje = new Date();
        const indice = hoje.getDate() % frases.length;
        return frases[indice];
    }

    carregarFraseLocal() {
        const frase = this.obterFraseLocal();
        this.exibirFrase(frase);
    }

    exibirFrase(frase) {
        const fraseElement = document.getElementById('frase-texto');
        if (fraseElement) {
            fraseElement.textContent = `"${frase}"`;
            fraseElement.style.fontStyle = 'italic';
            fraseElement.style.color = '#666';
            console.log('✅ Frase da internet carregada:', frase);
        } else {
            console.log('❌ Elemento #frase-texto não encontrado');
        }
    }

    checkAuth() {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        const currentUser = localStorage.getItem('currentUser');
        
        if (!isAuthenticated || !currentUser) {
            window.location.href = 'login.html';
            return;
        }
        
        this.currentUser = currentUser;
        this.updateUserDisplay();
    }

    updateUserDisplay() {
        const userElements = document.querySelectorAll('#current-user, #current-user-display');
        userElements.forEach(el => {
            if (el) el.textContent = this.currentUser;
        });
    }

    showAlert(message, type = 'info') {
        const alert = document.createElement('div');
        alert.style.cssText = `
            position: fixed; top: 20px; right: 20px; z-index: 10000;
            padding: 15px 20px; border-radius: 4px; color: white;
            font-weight: bold; min-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            background-color: ${type === 'success' ? '#4CAF50' : 
                            type === 'error' ? '#dc3545' : 
                            type === 'warning' ? '#ff9800' : '#2196F3'};
        `;
        alert.textContent = message;
        document.body.appendChild(alert);
        setTimeout(() => alert.remove(), 5000);
    }

    carregarLinksExternos() {
        console.log('🔗 Carregando links externos...');
        
        const linksExternos = [
            {
                titulo: "📊 Planilha de Carta de Imóveis",
                url: "https://docs.google.com/spreadsheets/d/1BPwecYI9zenjxQniEGgkh7CqBOSjOATi3R-2IRot4ow/edit?usp=sharing",
                descricao: "Acesse a planilha completa de carta de imóveis"
            },
            {
                titulo: "💰 Gestão Orçamentária",
                url: "https://docs.google.com/spreadsheets/d/1T4FRm4KUVQjD4aSg3Hn_FI6E0h_m8KbfaPGnlviXydI/edit?usp=drive_link",
                descricao: "Controle de orçamento e finanças"
            },
            {
                titulo: "👥 Gestão de Clientes",
                url: "https://app.pipefy.com/pipes/306719549",
                descricao: "Acesse o Pipefy para gestão de clientes"
            },
            {
                titulo: "📝 Formulário de Inclusão",
                url: "https://app.pipefy.com/public/form/09jNCcoi",
                descricao: "Formulário para inclusão de novos clientes"
            },
            {
                titulo: "🔐 Senhas Gerais",
                url: "https://forms.google.com/your-form-link",
                descricao: "Planilha de senhas da imobiliária"
            }
        ];

        const container = document.getElementById('links-externos-container');
        if (!container) {
            this.criarSecaoLinksExternos(linksExternos);
            return;
        }

        this.renderizarLinks(linksExternos, container);
    }

    criarSecaoLinksExternos(links) {
        const dashboard = document.getElementById('dashboard');
        if (!dashboard) return;

        const linksSection = document.createElement('div');
        linksSection.className = 'links-externos-section';
        linksSection.innerHTML = `
            <div class="section-header">
                <h2>🔗 Links Rápidos</h2>
                <p>Acessos rápidos às ferramentas</p>
            </div>
            <div class="row" id="links-externos-container"></div>
        `;

        const formSection = dashboard.querySelector('.form-cards-section');
        if (formSection) {
            formSection.parentNode.insertBefore(linksSection, formSection.nextSibling);
        } else {
            dashboard.appendChild(linksSection);
        }

        const container = document.getElementById('links-externos-container');
        this.renderizarLinks(links, container);
    }

    renderizarLinks(links, container) {
        if (!container) return;

        container.innerHTML = links.map(link => `
            <div class="col-4">
                <a href="${link.url}" target="_blank" class="card-button link-externo">
                    <div class="card-icon">${link.titulo.split(' ')[0]}</div>
                    <div class="card-title">${link.titulo}</div>
                    <div class="card-description">${link.descricao}</div>
                </a>
            </div>
        `).join('');

        console.log(`✅ ${links.length} links externos carregados`);
    }

    async testBackendConnection() {
        try {
            const response = await fetch('/api/teste-conexao', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({teste: true})
            });
        } catch (error) {
            console.error('Erro na conexão com backend:', error);
        }
    }

    checkSystemStatus() {
        console.log('✅ Sistema carregado com sucesso');
    }

    async checkPipefyStatus() {
        try {
            const response = await fetch('/api/pipefy-status');
            const status = await response.json();
            
            if (status.configurado) {
                console.log('✅ Pipefy configurado:', status.pipe);
                return true;
            } else {
                console.warn('⚠️ Pipefy não configurado');
                this.showAlert('Pipefy não configurado ou token inválido', 'warning');
                return false;
            }
        } catch (error) {
            console.error('❌ Erro ao verificar status Pipefy:', error);
            return false;
        }
    }

    async loadPipefyCards() {
        console.log('🔧 Carregando cards do Pipefy...');

        try {
            const response = await fetch('/api/active-clients');
            
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Erro ao carregar cards');
            }

            console.log(`✅ ${result.cards.length} cards encontrados`);
            return result.cards;

        } catch (error) {
            console.error('❌ Erro ao carregar cards do Pipefy:', error);
            this.showAlert(`Erro ao carregar cards: ${error.message}`, 'error');
            return [];
        }
    }

    preencherFormularioAutomatico(dadosPipefy) {
        console.log('🎯 Preenchimento automático...');
        let camposPreenchidos = 0;

        Object.keys(dadosPipefy).forEach(campoPipefy => {
            const valor = dadosPipefy[campoPipefy];
            const input = document.getElementById(campoPipefy);
            
            if (input && valor) {
                input.value = valor;
                camposPreenchidos++;
                console.log(`✅ ${campoPipefy}: ${valor}`);
            }
        });

        console.log(`🎉 ${camposPreenchidos} campos preenchidos automaticamente`);
        
        if (camposPreenchidos > 0) {
            this.showAlert(`${camposPreenchidos} campos preenchidos automaticamente!`, 'success');
        }
        
        return camposPreenchidos;
    }

    async loadCardData(cardId) {
        try {
            const response = await fetch('/api/mapear-card-pipefy', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ cardId })
            });
            
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Erro ao carregar dados do card');
            }

            console.log('🎯 DEBUG - Dados do Pipefy:');
            console.log('Card:', result.card.title);
            console.log('Dados mapeados:', result.dadosPreenchidos);
            
            Object.keys(result.dadosPreenchidos).forEach(campo => {
                console.log(`✅ ${campo}: "${result.dadosPreenchidos[campo]}"`);
            });

            return result;

        } catch (error) {
            console.error('❌ Erro ao carregar dados do card:', error);
            this.showAlert(`Erro ao carregar dados: ${error.message}`, 'error');
            return null;
        }
    }

    createCardSelector(cards, onSelect) {
        const container = document.createElement('div');
        container.className = 'dropdown';
        container.style.marginLeft = '10px';

        const button = document.createElement('button');
        button.className = 'btn btn-secondary';
        button.innerHTML = '🔗 Selecionar do Pipefy';
        button.type = 'button';

        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown-content';
        dropdown.style.display = 'none';

        if (cards.length === 0) {
            const item = document.createElement('a');
            item.textContent = 'Nenhum card encontrado';
            item.style.color = '#999';
            item.style.cursor = 'not-allowed';
            dropdown.appendChild(item);
        } else {
            cards.forEach(card => {
                const item = document.createElement('a');
                item.href = '#';
                item.innerHTML = `<strong>${card.title}</strong><br><small>ID: ${card.id}</small>`;
                item.style.padding = '10px';
                item.style.borderBottom = '1px solid #eee';
                
                item.addEventListener('click', async (e) => {
                    e.preventDefault();
                    button.innerHTML = '⏳ Carregando...';
                    button.disabled = true;
                    
                    const cardData = await this.loadCardData(card.id);
                    
                    if (cardData) {
                        onSelect(cardData);
                        button.innerHTML = `✅ ${card.title.substring(0, 20)}...`;
                    } else {
                        button.innerHTML = '🔗 Selecionar do Pipefy';
                        this.showAlert('Erro ao carregar dados do card', 'error');
                    }
                    
                    button.disabled = false;
                    dropdown.style.display = 'none';
                });
                dropdown.appendChild(item);
            });
        }

        button.addEventListener('click', () => {
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        });

        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });

        container.appendChild(button);
        container.appendChild(dropdown);

        return container;
    }
}

function showPage(pageName) {
    console.log('📄 Mostrando:', pageName);
    
    const dashboard = document.getElementById('dashboard');
    const pageContent = document.getElementById('page-content');

    if (dashboard) dashboard.style.display = 'none';
    if (pageContent) pageContent.style.display = 'none';

    if (pageName === 'dashboard') {
        if (dashboard) {
            dashboard.style.display = 'block';
            if (window.app) {
                window.app.carregarFraseInternet();
            }
        }
        return;
    }

    if (pageContent) {
        pageContent.style.display = 'block';
        
        const pageLoaders = {
            'cadastro-imovel': () => loadCadastroImovelPage(),
            'recibo-aluguel': () => loadReciboAluguelPage(),
            'termo-vistoria': () => loadTermoVistoriaPage(),
            'contrato-locacao': () => loadContratoLocacaoPage(),
            'contrato-administracao': () => loadContratoAdministracaoPage(),
            'ficha-cadastral': () => loadFichaCadastralPage(),
            'gestao-condominios': () => loadGestaoCondominiosPage()
        };

        if (pageLoaders[pageName]) {
            pageLoaders[pageName]();
        } else {
            pageContent.innerHTML = '<div class="alert alert-danger">Página não encontrada</div>';
        }
    }
}

function logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function goBack() {
    showPage('dashboard');
}

document.addEventListener('DOMContentLoaded', function() {
    window.app = new App();
    showPage('dashboard');
});