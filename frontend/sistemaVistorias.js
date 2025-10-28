//===============================================================
// SISTEMA DE VISTORIAS - VILLARES IMÓVEIS - ATUALIZADO
//===============================================================

let vistorias = JSON.parse(localStorage.getItem('vistorias_villares')) || [];
let fotosParaUpload = [];

// FUNÇÃO PRINCIPAL PARA CARREGAR A PÁGINA DE VISTORIAS
async function loadVistoriasPage() {
    console.log('Carregando página de vistorias Villares...');

    const content = document.getElementById('page-content');
    if (!content) {
        console.error('Elemento page-content não encontrado!');
        return;
    }

    content.innerHTML = `
        <div class="page-container">
            <div class="page-header">
                <button class="btn btn-secondary" onclick="goBack()">← VOLTAR</button>
                <h1>📷 SISTEMA DE VISTORIAS</h1>
            </div>

            <div class="main-container">
                <div id="loading" class="alert alert-info">Carregando...</div>

                <form id="vistoria-form">
                    <!-- Dados da Vistoria -->
                    <div class="section-header">
                        <h3>DADOS DA VISTORIA</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Endereço do Imóvel</label>
                                <input type="text" id="enderecoVistoria" class="form-control" placeholder="Endereço completo do imóvel" required>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label>Data da Vistoria</label>
                                <input type="date" id="dataVistoria" class="form-control" value="${new Date().toISOString().split('T')[0]}" required>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label>Vistoriador</label>
                                <input type="text" id="vistoriador" class="form-control" placeholder="Nome do vistoriador" required>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Observações</label>
                        <textarea id="observacoesVistoria" class="form-control" rows="3" placeholder="Observações sobre a vistoria..."></textarea>
                    </div>

                    <!-- Upload de Fotos em Quadradinhos Pequenos -->
                    <div class="section-header">
                        <h3>FOTOS DA VISTORIA</h3>
                    </div>

                    <div class="form-group">
                        <div class="upload-section">
                            <div class="upload-area" id="upload-area">
                                <div class="upload-content">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                    <p>Arraste e solte as fotos aqui</p>
                                    <small>ou clique para selecionar</small>
                                    <small class="text-muted">Formatos: JPG, PNG, GIF (Máx. 5MB por foto)</small>
                                </div>
                                <input type="file" id="fotosInput" multiple accept="image/*" style="display: none;">
                            </div>
                            
                            <!-- Grid de Fotos em Quadradinhos Pequenos -->
                            <div id="fotos-grid" class="fotos-grid mt-3"></div>
                        </div>
                    </div>

                    <!-- Botão de Salvar -->
                    <div class="row mt-3">
                        <div class="col-12 text-center">
                            <button type="button" class="btn btn-primary btn-block" onclick="salvarVistoria()">
                                💾 SALVAR VISTORIA
                            </button>
                        </div>
                    </div>
                </form>

                <!-- Lista de Vistorias Salvas -->
                <div class="section-header mt-4">
                    <h3>VISTORIAS SALVAS</h3>
                </div>

                <div id="lista-vistorias">
                    ${renderizarListaVistorias()}
                </div>
            </div>
        </div>
    `;

    // Configurar eventos de upload
    configurarUploadVistoria();
}

// CONFIGURAR UPLOAD DE FOTOS PARA VISTORIA
function configurarUploadVistoria() {
    const uploadArea = document.getElementById('upload-area');
    const fotosInput = document.getElementById('fotosInput');

    if (!uploadArea || !fotosInput) return;

    // Clique na área de upload
    uploadArea.addEventListener('click', () => {
        fotosInput.click();
    });

    // Arrastar e soltar
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        processarArquivosVistoria(e.dataTransfer.files);
    });

    // Seleção de arquivos
    fotosInput.addEventListener('change', (e) => {
        processarArquivosVistoria(e.target.files);
    });
}

// PROCESSAR ARQUIVOS PARA VISTORIA (QUADRADINHOS PEQUENOS)
function processarArquivosVistoria(files) {
    const grid = document.getElementById('fotos-grid');
    
    for (let file of files) {
        if (file.size > 5 * 1024 * 1024) {
            showAlert(`Arquivo ${file.name} é muito grande. Máximo 5MB.`, 'warning');
            continue;
        }

        if (!file.type.startsWith('image/')) {
            showAlert(`Arquivo ${file.name} não é uma imagem válida.`, 'warning');
            continue;
        }

        fotosParaUpload.push(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            const fotoItem = document.createElement('div');
            fotoItem.className = 'foto-grid-item';
            fotoItem.innerHTML = `
                <div class="foto-grid-image">
                    <img src="${e.target.result}" alt="Preview">
                    <button type="button" class="btn-remove-grid" onclick="removerFotoGrid('${file.name}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="foto-grid-info">
                    <span class="foto-grid-name">${file.name.substring(0, 12)}${file.name.length > 12 ? '...' : ''}</span>
                </div>
            `;
            grid.appendChild(fotoItem);
        };
        reader.readAsDataURL(file);
    }
}

// REMOVER FOTO DO GRID
function removerFotoGrid(nomeArquivo) {
    fotosParaUpload = fotosParaUpload.filter(file => file.name !== nomeArquivo);
    
    const grid = document.getElementById('fotos-grid');
    const items = grid.getElementsByClassName('foto-grid-item');
    
    for (let item of items) {
        const nome = item.querySelector('.foto-grid-name').textContent;
        if (nome === nomeArquivo.substring(0, 12) + (nomeArquivo.length > 12 ? '...' : '')) {
            item.remove();
            break;
        }
    }
}

// SALVAR VISTORIA
async function salvarVistoria() {
    const endereco = document.getElementById('enderecoVistoria').value;
    const data = document.getElementById('dataVistoria').value;
    const vistoriador = document.getElementById('vistoriador').value;
    const observacoes = document.getElementById('observacoesVistoria').value;

    if (!endereco || !data || !vistoriador) {
        showAlert('Por favor, preencha todos os campos obrigatórios!', 'warning');
        return;
    }

    if (fotosParaUpload.length === 0) {
        showAlert('Por favor, adicione pelo menos uma foto!', 'warning');
        return;
    }

    showAlert('Salvando vistoria...', 'info');

    try {
        const fotosUrls = await uploadFotosParaCloudinary();

        const vistoria = {
            id: Date.now().toString(),
            endereco,
            data,
            vistoriador,
            observacoes,
            fotos: fotosUrls,
            dataCriacao: new Date().toISOString()
        };

        vistorias.unshift(vistoria);
        localStorage.setItem('vistorias_villares', JSON.stringify(vistorias));

        showAlert('Vistoria salva com sucesso!', 'success');
        
        // Limpar formulário
        document.getElementById('vistoria-form').reset();
        fotosParaUpload = [];
        document.getElementById('fotos-grid').innerHTML = '';
        
        // Atualizar lista
        document.getElementById('lista-vistorias').innerHTML = renderizarListaVistorias();

    } catch (error) {
        console.error('Erro ao salvar vistoria:', error);
        showAlert('Erro ao salvar vistoria: ' + error.message, 'error');
    }
}

// UPLOAD PARA CLOUDINARY
async function uploadFotosParaCloudinary() {
    if (fotosParaUpload.length === 0) return [];

    const urls = [];
    
    for (let file of fotosParaUpload) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'villares_vistorias');
            formData.append('cloud_name', 'da5gy1gds');

            const response = await fetch('https://api.cloudinary.com/v1_1/villaresimoveis/image/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error(`Erro no upload: ${response.status}`);

            const data = await response.json();
            urls.push({
                url: data.secure_url,
                public_id: data.public_id,
                nome: file.name
            });

        } catch (error) {
            console.error('Erro no upload da foto:', error);
            throw new Error(`Falha no upload da foto ${file.name}`);
        }
    }

    return urls;
}

// RENDERIZAR LISTA DE VISTORIAS
function renderizarListaVistorias() {
    if (vistorias.length === 0) {
        return `
            <div class="alert alert-info text-center">
                <i class="fas fa-camera fa-2x mb-2"></i>
                <p>Nenhuma vistoria cadastrada</p>
                <small>Adicione fotos para criar sua primeira vistoria</small>
            </div>
        `;
    }

    return vistorias.map(vistoria => `
        <div class="vistoria-card">
            <div class="vistoria-card-header">
                <h4>${vistoria.endereco}</h4>
                <div class="vistoria-meta">
                    <span><i class="fas fa-calendar"></i> ${formatarData(vistoria.data)}</span>
                    <span><i class="fas fa-user"></i> ${vistoria.vistoriador}</span>
                    <span><i class="fas fa-images"></i> ${vistoria.fotos.length} foto(s)</span>
                </div>
            </div>
            
            ${vistoria.observacoes ? `
                <div class="vistoria-observacoes">
                    <strong>Observações:</strong> ${vistoria.observacoes}
                </div>
            ` : ''}
            
            <div class="vistoria-fotos-preview">
                ${vistoria.fotos.slice(0, 4).map(foto => `
                    <div class="foto-preview-small">
                        <img src="${foto.url}" alt="${foto.nome}">
                    </div>
                `).join('')}
                ${vistoria.fotos.length > 4 ? `
                    <div class="foto-preview-more">
                        +${vistoria.fotos.length - 4}
                    </div>
                ` : ''}
            </div>
            
            <div class="vistoria-actions">
                <button class="btn btn-primary btn-sm" onclick="visualizarVistoria('${vistoria.id}')">
                    <i class="fas fa-eye"></i> Ver Todas
                </button>
                <button class="btn btn-secondary btn-sm" onclick="downloadVistoria('${vistoria.id}')">
                    <i class="fas fa-download"></i> Download
                </button>
                <button class="btn btn-danger btn-sm" onclick="excluirVistoria('${vistoria.id}')">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        </div>
    `).join('');
}

// VISUALIZAR VISTORIA COMPLETA
function visualizarVistoria(vistoriaId) {
    const vistoria = vistorias.find(v => v.id === vistoriaId);
    if (!vistoria) return;

    const fotosHTML = vistoria.fotos.map(foto => `
        <div class="foto-modal-item">
            <img src="${foto.url}" alt="${foto.nome}" class="foto-modal-image">
            <div class="foto-modal-info">
                <span>${foto.nome}</span>
                <button class="btn btn-primary btn-sm" onclick="downloadFoto('${foto.url}', '${foto.nome}')">
                    <i class="fas fa-download"></i> Baixar
                </button>
            </div>
        </div>
    `).join('');

    const modalHTML = `
        <div class="modal-overlay active" id="vistoria-modal">
            <div class="modal-dialog">
                <div class="modal-header">
                    <h4>📷 Vistoria - ${vistoria.endereco}</h4>
                    <button class="btn-close" onclick="fecharModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="vistoria-details">
                        <p><strong>Data:</strong> ${formatarData(vistoria.data)}</p>
                        <p><strong>Vistoriador:</strong> ${vistoria.vistoriador}</p>
                        ${vistoria.observacoes ? `
                            <p><strong>Observações:</strong> ${vistoria.observacoes}</p>
                        ` : ''}
                    </div>
                    <div class="fotos-modal-grid">
                        ${fotosHTML}
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// FUNÇÕES AUXILIARES
function fecharModal() {
    const modal = document.getElementById('vistoria-modal');
    if (modal) modal.remove();
}

function downloadFoto(url, nome) {
    const a = document.createElement('a');
    a.href = url;
    a.download = nome;
    a.click();
}

function downloadVistoria(vistoriaId) {
    const vistoria = vistorias.find(v => v.id === vistoriaId);
    if (!vistoria) return;

    // Criar relatório em texto
    const dados = `
VISTORIA VILLARES IMÓVEIS
==========================

Endereço: ${vistoria.endereco}
Data: ${formatarData(vistoria.data)}
Vistoriador: ${vistoria.vistoriador}
Observações: ${vistoria.observacoes || 'Nenhuma'}
Total de Fotos: ${vistoria.fotos.length}

LISTA DE FOTOS:
${vistoria.fotos.map((foto, index) => `${index + 1}. ${foto.nome} - ${foto.url}`).join('\n')}

Relatório gerado em: ${new Date().toLocaleString('pt-BR')}
    `;

    const blob = new Blob([dados], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vistoria_${vistoria.endereco.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_')}_${vistoria.data}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
}

function excluirVistoria(vistoriaId) {
    if (!confirm('Tem certeza que deseja excluir esta vistoria? Esta ação não pode ser desfeita.')) return;

    vistorias = vistorias.filter(v => v.id !== vistoriaId);
    localStorage.setItem('vistorias_villares', JSON.stringify(vistorias));
    document.getElementById('lista-vistorias').innerHTML = renderizarListaVistorias();
    showAlert('Vistoria excluída com sucesso!', 'success');
}

function formatarData(dataString) {
    return new Date(dataString).toLocaleDateString('pt-BR');
}

function showAlert(message, type = 'info') {
    if (window.app && window.app.showAlert) {
        window.app.showAlert(message, type);
    } else {
        alert(message);
    }
}