// Aplicação principal
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
    }

    
    checkAuth() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const currentUser = localStorage.getItem('currentUser');
    
    if (!isAuthenticated || !currentUser) {
        // Redirecionar para login se não estiver autenticado
        window.location.href = 'login.html';
        return;
    }
    
    this.currentUser = currentUser;
    this.updateUserDisplay();
}

    updateUserDisplay() {
        const userElements = document.querySelectorAll("#current-user, #current-user-display");
        userElements.forEach(el => {
            if (el) el.textContent = this.currentUser;
        });
    }

    showAlert(message, type = 'info') {
        const existingAlerts = document.querySelectorAll('.custom-alert');
        existingAlerts.forEach(alert => alert.remove());

        const alert = document.createElement('div');
        alert.className = `custom-alert alert-${type}`;
        alert.textContent = message;

        alert.style.position = 'fixed';
        alert.style.top = '20px';
        alert.style.right = '20px';
        alert.style.zIndex = '10000';
        alert.style.padding = '15px 20px';
        alert.style.borderRadius = '4px';
        alert.style.color = 'white';
        alert.style.fontWeight = 'bold';
        alert.style.minWidth = '300px';
        alert.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';

        const colors = {
            success: '#4CAF50',
            error: '#dc3545',
            info: '#2196F3',
            warning: '#ff9800'
        };

        alert.style.backgroundColor = colors[type] || colors.info;
        document.body.appendChild(alert);

        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }

    async loadPipefyCards() {
        try {
            const response = await fetch('/api/active-clients');
            if (!response.ok) throw new Error('Erro ao buscar cards');
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar cards do Pipefy', error);
            this.showAlert('Erro ao carregar dados do Pipefy', 'error');
            return [];
        }
    }

    createCardSelector(cards, onSelect) {
        const container = document.createElement('div');
        container.className = 'dropdown';
        container.style.marginLeft = '10px';

        const button = document.createElement('button');
        button.className = 'btn btn-secondary';
        button.textContent = 'Selecionar Card';
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
                item.textContent = card.title || `Card ${card.id}`;
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    onSelect(card);
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

    // Função para criar cards de links externos
    createExternalLinkCards() {
        const container = document.createElement('div');
        container.className = 'external-links-section';
        
        // Título da seção igual ao do Dashboard
        const title = document.createElement('h2');
        title.className = 'section-title';
        title.innerHTML = '🔗 Ferramentas Externas';
        
        container.appendChild(title);

        // Cards dos links externos
        const externalLinks = [
            {
                title: 'Planilha de Carta de Imóveis',
                description: 'Acesse a planilha completa de carta de imóveis',
                url: 'https://docs.google.com/spreadsheets/d/1BPwecYI9zenjxQniEGgkh7CqBOSjOATi3R-2IRot4ow/edit?usp=sharing',
                icon: '📊',
                color: '#4CAF50'
            },
            {
                title: 'Gestão Orçamentária',
                description: 'Controle de orçamento e finanças',
                url: 'https://docs.google.com/spreadsheets/d/1T4FRm4KUVQjD4aSg3Hn_FI6E0h_m8KbfaPGnlviXydI/edit?usp=drive_link',
                icon: '💰',
                color: '#2196F3'
            },
            {
                title: 'Gestão de Clientes',
                description: 'Acesse o Pipefy para gestão de clientes',
                url: 'https://app.pipefy.com/pipes/306719549',
                icon: '👥',
                color: '#FF9800'
            },
            {
                title: 'Formulário de Inclusão',
                description: 'Formulário para inclusão de novos clientes',
                url: 'https://app.pipefy.com/public/form/09jNCcoi',
                icon: '📝',
                color: '#9C27B0'
            },
            {
                title: 'Senhas Gerais',
                description: 'Planilha de senhas da imobiliária',
                url: 'https://forms.google.com/your-form-link',
                icon: '🔐',
                color: '#e5e508'
            }
        ];

        // Criar grid para os cards
        const grid = document.createElement('div');
        grid.className = 'external-links-grid';
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
        grid.style.gap = '20px';
        grid.style.marginTop = '20px';

        externalLinks.forEach(link => {
            const card = document.createElement('div');
            card.className = 'external-link-card';
            card.style.backgroundColor = 'white';
            card.style.border = `3px solid ${link.color}`;
            card.style.borderRadius = '10px';
            card.style.padding = '20px';
            card.style.cursor = 'pointer';
            card.style.transition = 'all 0.3s ease';
            card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            card.style.textAlign = 'center';
            card.style.minHeight = '140px';
            card.style.display = 'flex';
            card.style.flexDirection = 'column';
            card.style.justifyContent = 'center';
            card.style.alignItems = 'center';

            // Efeitos hover
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 8px 15px rgba(0,0,0,0.2)';
                card.style.backgroundColor = `${link.color}15`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                card.style.backgroundColor = 'white';
            });

            // Ícone
            const icon = document.createElement('div');
            icon.textContent = link.icon;
            icon.style.fontSize = '2.5rem';
            icon.style.marginBottom = '10px';

            // Título
            const title = document.createElement('h4');
            title.textContent = link.title;
            title.style.margin = '0 0 8px 0';
            title.style.color = '#333';
            title.style.fontSize = '1.1rem';
            title.style.fontWeight = 'bold';

            // Descrição
            const description = document.createElement('p');
            description.textContent = link.description;
            description.style.margin = '0';
            description.style.color = '#666';
            description.style.fontSize = '0.9rem';
            description.style.lineHeight = '1.4';

            // Clique para abrir link
            card.addEventListener('click', () => {
                window.open(link.url, '_blank');
            });

            card.appendChild(icon);
            card.appendChild(title);
            card.appendChild(description);
            grid.appendChild(card);
        });

        container.appendChild(grid);
        return container;
    }
}

// Funções globais
function showPage(pageName) {
    const app = window.app;
    if (!app) return;

    app.currentPage = pageName;

    const dashboard = document.getElementById('dashboard');
    const pageContent = document.getElementById('page-content');

    if (dashboard) dashboard.classList.add('hidden');
    if (pageContent) pageContent.innerHTML = '';

    if (pageName === 'dashboard') {
        if (dashboard) dashboard.classList.remove('hidden');
        
        // Adicionar cards de links externos ao dashboard
        const existingExternalLinks = document.querySelector('.external-links-section');
        if (existingExternalLinks) {
            existingExternalLinks.remove();
        }
        
        const externalLinksSection = app.createExternalLinkCards();
        dashboard.appendChild(externalLinksSection);
        return;
    }

    const pageLoaders = {
        'cadastro-imovel': () => loadCadastroImovelPage(),
        'contrato-locacao': () => loadContratoLocacaoPage(),
        'contrato-administracao': () => loadContratoAdministracaoPage(),
        'ficha-cadastral': () => loadFichaCadastralPage(),
        'recibo-aluguel': () => loadReciboAluguelPage(),
        'termo-vistoria': () => loadTermoVistoriaPage(),
        'gestao-condominios': () => loadGestaoCondominiosPage()
    };

    if (pageLoaders[pageName]) {
        pageLoaders[pageName]();
        
        setTimeout(() => {
            injectPipefySelector();
        }, 800);
    }
}

function logout() {
    // Limpar TODOS os dados de autenticação
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    
    // Redirecionar para login
    window.location.href = 'login.html';
}

function goBack() {
    showPage("dashboard");
}

// Função para carregar dados do Pipefy
async function loadPipefyData() {
    try {
        const app = window.app;
        if (!app) return;

        const result = await app.loadPipefyCards();
        const cards = result.cards || result || [];

        const selectorContainer = document.getElementById("pipefy-selector");
        if (selectorContainer && cards.length > 0) {
            selectorContainer.innerHTML = '';
            
            const selector = app.createCardSelector(cards, (card) => {
                app.showAlert(`Card "${card.title}" selecionado! Preenchendo formulário...`, 'success');
                preencherFormularioComDadosPipefy(card);
            });
            
            selectorContainer.appendChild(selector);
        } else if (selectorContainer) {
            selectorContainer.innerHTML = '<div class="alert alert-warning">Nenhum card encontrado no Pipefy</div>';
        }
    } catch (error) {
        console.error("Erro ao carregar dados do Pipefy:", error);
        const selectorContainer = document.getElementById("pipefy-selector");
        if (selectorContainer) {
            selectorContainer.innerHTML = '<div class="alert alert-danger">Erro ao carregar dados do Pipefy</div>';
        }
    }
}

// Função para preencher formulário
async function preencherFormularioComDadosPipefy(card) {
    try {
        const response = await fetch('/api/mapear-card-pipefy', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ cardId: card.id })
        });
        
        const result = await response.json();
        
        if (result.success && result.dadosPreenchidos) {
            const dados = result.dadosPreenchidos;
            
            for (const [campo, valor] of Object.entries(dados)) {
                const input = document.querySelector(`[name="${campo}"]`) || 
                             document.getElementById(campo);
                
                if (input) {
                    if (input.type === 'checkbox' || input.type === 'radio') {
                        input.checked = !!valor;
                    } else {
                        input.value = valor || '';
                    }
                }
            }
            
            window.app.showAlert('Formulário preenchido automaticamente!', 'success');
        } else {
            window.app.showAlert('Erro ao mapear dados do card', 'error');
        }
        
    } catch (error) {
        console.error('Erro ao preencher formulário:', error);
        window.app.showAlert('Erro ao preencher formulário', 'error');
    }
}

// Função para injetar seletor APENAS em formulários
function injectPipefySelector() {
    if (window.app.currentPage === 'dashboard') {
        return;
    }
    
    setTimeout(() => {
        const pageContent = document.getElementById('page-content');
        if (!pageContent) return;
        
        const hasForm = pageContent.querySelector('form') || 
                       pageContent.querySelector('.form-container') ||
                       pageContent.innerHTML.includes('</form>');
        
        if (!hasForm) {
            console.log('Ainda não carregou o formulário');
            return;
        }
        
        const oldSelector = document.getElementById('pipefy-selector');
        if (oldSelector) oldSelector.remove();
        
        const selectorHTML = `
            <div class="form-group" style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px; border: 2px solid #007bff;">
                <label style="font-weight: bold; color: #333; font-size: 16px;">
                    🚀 SELECIONAR CARD DO PIPEFY:
                </label>
                <div id="pipefy-selector">
                    <div class="alert alert-info">Carregando dados do Pipefy...</div>
                </div>
                <small class="text-muted">Selecione um card para preencher automaticamente o formulário</small>
            </div>
            <hr>
        `;
        
        pageContent.insertAdjacentHTML('afterbegin', selectorHTML);
        loadPipefyData();
        
    }, 100);
}

// Inicializar aplicação
document.addEventListener("DOMContentLoaded", () => {
    window.app = new App();
    showPage("dashboard");
});