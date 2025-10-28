//===============================================================
// SISTEMA DE VISTORIAS - VILLARES IMÓVEIS - ATUALIZADO
//===============================================================

let vistorias = JSON.parse(localStorage.getItem('vistorias_villares')) || [];
let fotosParaUpload = [];
let fotosSelecionadas = [];

// FUNÇÃO PARA FORMATAR DATA
function formatarData(dataString) {
    return new Date(dataString).toLocaleDateString('pt-BR');
}

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

                    <!-- Upload de Fotos -->
                    <div class="section-header">
                        <h3>FOTOS DA VISTORIA</h3>
                        <div id="fotos-count" class="badge badge-primary" style="display: none;">0 fotos selecionadas</div>
                    </div>

                    <div class="form-group">
                        <div class="upload-section">
                            <div class="upload-area" id="upload-area" style="position: relative; overflow: hidden;">
                                <div class="upload-content">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                    <p>Arraste e solte as fotos aqui</p>
                                    <small>ou clique para selecionar</small>
                                    <small class="text-muted">Formatos: JPG, PNG, GIF (Máx. 5MB por foto)</small>
                                </div>
                                <input type="file" id="fotosInput" multiple accept="image/*" style="position: absolute; width: 100%; height: 100%; opacity: 0; cursor: pointer; top: 0; left: 0; z-index: 10;">
                            </div>
                            
                            <!-- Botão para ver fotos selecionadas -->
                            <div id="fotos-preview-section" class="mt-3" style="display: none;">
                                <button type="button" class="btn btn-info btn-block" onclick="visualizarFotosSelecionadas()">
                                    <i class="fas fa-eye"></i> Ver Fotos Selecionadas (<span id="fotos-count-preview">0</span>)
                                </button>
                            </div>
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

// PROCESSAR ARQUIVOS PARA VISTORIA
function processarArquivosVistoria(files) {
    if (files.length === 0) return;

    // Limpar array anterior
    fotosSelecionadas = [];

    for (let file of files) {
        if (file.size > 5 * 1024 * 1024) {
            showAlert(`Arquivo ${file.name} é muito grande. Máximo 5MB.`, 'warning');
            continue;
        }

        if (!file.type.startsWith('image/')) {
            showAlert(`Arquivo ${file.name} não é uma imagem válida.`, 'warning');
            continue;
        }

        fotosSelecionadas.push(file);
    }

    if (fotosSelecionadas.length > 0) {
        // Mostrar contador de fotos
        const fotosCount = document.getElementById('fotos-count');
        const fotosCountPreview = document.getElementById('fotos-count-preview');
        const previewSection = document.getElementById('fotos-preview-section');
        
        fotosCount.textContent = `${fotosSelecionadas.length} foto(s) selecionada(s)`;
        fotosCount.style.display = 'inline-block';
        
        fotosCountPreview.textContent = fotosSelecionadas.length;
        previewSection.style.display = 'block';

        showAlert(`${fotosSelecionadas.length} foto(s) selecionada(s) com sucesso! Clique em "Ver Fotos Selecionadas" para visualizar.`, 'success');
    }
}

// VISUALIZAR FOTOS SELECIONADAS ANTES DE SALVAR
function visualizarFotosSelecionadas() {
    if (fotosSelecionadas.length === 0) {
        showAlert('Nenhuma foto selecionada!', 'warning');
        return;
    }

    // Criar página de pré-visualização
    const paginaPreview = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pré-visualização das Fotos</title>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    background: #f5f5f5;
                }
                .header {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    text-align: center;
                }
                .fotos-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 15px;
                    margin-bottom: 30px;
                }
                .foto-item {
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    text-align: center;
                }
                .foto-item img {
                    width: 100%;
                    height: 150px;
                    object-fit: cover;
                }
                .foto-info {
                    padding: 10px;
                    font-size: 12px;
                    color: #666;
                }
                .btn-confirmar {
                    background: #28a745;
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 6px;
                    font-size: 16px;
                    cursor: pointer;
                    margin: 10px;
                }
                .btn-voltar {
                    background: #6c757d;
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 6px;
                    font-size: 16px;
                    cursor: pointer;
                    margin: 10px;
                }
                .botoes-container {
                    text-align: center;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1><i class="fas fa-images"></i> Pré-visualização das Fotos</h1>
                <p><strong>Total de fotos:</strong> ${fotosSelecionadas.length}</p>
                <p>Confirme se todas as fotos estão corretas antes de salvar a vistoria.</p>
            </div>

            <div class="fotos-container">
                ${fotosSelecionadas.map((foto, index) => {
                    const url = URL.createObjectURL(foto);
                    return `
                        <div class="foto-item">
                            <img src="${url}" alt="Foto ${index + 1}">
                            <div class="foto-info">
                                <strong>Foto ${index + 1}</strong><br>
                                ${foto.name}<br>
                                ${(foto.size / 1024 / 1024).toFixed(2)} MB
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="botoes-container">
                <button class="btn-confirmar" onclick="confirmarFotos()">
                    <i class="fas fa-check"></i> Confirmar Fotos
                </button>
                <button class="btn-voltar" onclick="window.close()">
                    <i class="fas fa-times"></i> Fechar
                </button>
            </div>

            <script>
                function confirmarFotos() {
                    // Fechar a janela e continuar no formulário
                    window.close();
                }
            </script>
        </body>
        </html>
    `;

    // Abrir nova janela
    const novaJanela = window.open('', '_blank', 'width=1000,height=700,scrollbars=yes');
    novaJanela.document.write(paginaPreview);
    novaJanela.document.close();
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

    if (fotosSelecionadas.length === 0) {
        showAlert('Por favor, adicione pelo menos uma foto!', 'warning');
        return;
    }

    showAlert('Salvando vistoria e fazendo upload das fotos...', 'info');

    try {
        // Fazer upload das fotos para Cloudinary
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
        limparFormularioVistoria();
        
        // Atualizar lista
        document.getElementById('lista-vistorias').innerHTML = renderizarListaVistorias();

    } catch (error) {
        console.error('Erro ao salvar vistoria:', error);
        showAlert('Erro ao salvar vistoria: ' + error.message, 'error');
    }
}

// UPLOAD PARA CLOUDINARY
async function uploadFotosParaCloudinary() {
    if (fotosSelecionadas.length === 0) return [];

    const urls = [];
    
    for (let file of fotosSelecionadas) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'villares_vistorias');
            formData.append('cloud_name', 'da5gy1gds');

            const response = await fetch('https://api.cloudinary.com/v1_1/da5gy1gds/image/upload', {
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

// LIMPAR FORMULÁRIO APÓS SALVAR
function limparFormularioVistoria() {
    document.getElementById('vistoria-form').reset();
    fotosSelecionadas = [];
    
    // Limpar indicadores de fotos
    const fotosCount = document.getElementById('fotos-count');
    const previewSection = document.getElementById('fotos-preview-section');
    
    fotosCount.style.display = 'none';
    previewSection.style.display = 'none';
}

// RENDERIZAR LISTA DE VISTORIAS SIMPLIFICADA COM PESQUISA
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

    return `
        <!-- Barra de Pesquisa -->
        <div class="search-bar mb-3">
            <div class="input-group">
                <input type="text" id="search-vistorias" class="form-control" 
                       placeholder="🔍 Pesquisar por endereço, vistoriador..." 
                       onkeyup="filtrarVistorias()">
                <button class="btn btn-outline-secondary" type="button" onclick="filtrarVistorias()">
                    <i class="fas fa-search"></i>
                </button>
                <button class="btn btn-outline-secondary" type="button" onclick="limparPesquisa()" title="Limpar pesquisa">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>

        <!-- Contador de resultados -->
        <div class="search-info mb-2">
            <small class="text-muted" id="search-count">
                Mostrando ${vistorias.length} vistoria(s)
            </small>
        </div>

        <!-- Lista de Vistorias -->
        <div id="vistorias-list">
            ${vistorias.map(vistoria => `
                <div class="vistoria-item" 
                     data-endereco="${vistoria.endereco.toLowerCase()}" 
                     data-vistoriador="${vistoria.vistoriador.toLowerCase()}">
                    <div class="vistoria-item-header">
                        <div class="vistoria-item-info">
                            <h5 class="vistoria-endereco">${vistoria.endereco}</h5>
                            <div class="vistoria-meta">
                                <span class="vistoria-data"><i class="fas fa-calendar"></i> ${formatarData(vistoria.data)}</span>
                                <span class="vistoria-vistoriador"><i class="fas fa-user"></i> ${vistoria.vistoriador}</span>
                                <span class="vistoria-fotos-count"><i class="fas fa-images"></i> ${vistoria.fotos.length} foto(s)</span>
                            </div>
                            ${vistoria.observacoes ? `
                                <div class="vistoria-observacoes">
                                    <strong>Observações:</strong> ${vistoria.observacoes}
                                </div>
                            ` : ''}
                        </div>
                        <div class="vistoria-item-actions">
                            <button class="btn btn-primary btn-sm" onclick="visualizarVistoria('${vistoria.id}')" title="Ver fotos">
                                <i class="fas fa-eye"></i> Ver Fotos
                            </button>
                            <button class="btn btn-success btn-sm" onclick="baixarTodasFotos('${vistoria.id}')" title="Baixar todas as fotos">
                                <i class="fas fa-download"></i> Baixar Vistoria
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="excluirVistoria('${vistoria.id}')" title="Excluir vistoria">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// FILTRAR VISTORIAS
function filtrarVistorias() {
    const searchTerm = document.getElementById('search-vistorias').value.toLowerCase();
    const vistoriaItems = document.querySelectorAll('.vistoria-item');
    let visibleCount = 0;

    vistoriaItems.forEach(item => {
        const endereco = item.getAttribute('data-endereco');
        const vistoriador = item.getAttribute('data-vistoriador');
        
        const matches = endereco.includes(searchTerm) || 
                       vistoriador.includes(searchTerm);
        
        item.style.display = matches ? 'block' : 'none';
        if (matches) visibleCount++;
    });

    // Atualizar contador
    const searchCount = document.getElementById('search-count');
    if (searchCount) {
        searchCount.textContent = `Mostrando ${visibleCount} vistoria(s)${searchTerm ? ` para "${searchTerm}"` : ''}`;
    }
}

// LIMPAR PESQUISA
function limparPesquisa() {
    document.getElementById('search-vistorias').value = '';
    filtrarVistorias();
}

// BAIXAR TODAS AS FOTOS DA VISTORIA
async function baixarTodasFotos(vistoriaId) {
    const vistoria = vistorias.find(v => v.id === vistoriaId);
    if (!vistoria || vistoria.fotos.length === 0) {
        showAlert('Nenhuma foto encontrada para download!', 'warning');
        return;
    }

    showAlert(`Iniciando download de ${vistoria.fotos.length} fotos...`, 'info');

    try {
        // Baixar cada foto sequencialmente
        for (let i = 0; i < vistoria.fotos.length; i++) {
            const foto = vistoria.fotos[i];
            
            // Criar link de download para cada foto
            const a = document.createElement('a');
            a.href = foto.url;
            a.download = `vistoria_${vistoria.endereco.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_')}_${i + 1}.jpg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            // Pequena pausa entre os downloads para não sobrecarregar
            if (i < vistoria.fotos.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
        
        showAlert(`Download concluído! ${vistoria.fotos.length} fotos baixadas.`, 'success');
        
    } catch (error) {
        console.error('Erro no download das fotos:', error);
        showAlert('Erro ao baixar as fotos. Tente novamente.', 'error');
    }
}

// VISUALIZAR VISTORIA EM NOVA PÁGINA SIMPLES
function visualizarVistoria(vistoriaId) {
    const vistoria = vistorias.find(v => v.id === vistoriaId);
    if (!vistoria) return;

    // Criar página simples com as fotos
    const paginaFotos = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Fotos da Vistoria - ${vistoria.endereco}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    background: #f5f5f5;
                }
                .header {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                .fotos-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 15px;
                }
                .foto-item {
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                .foto-item img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                }
                .btn-voltar {
                    background: #6c757d;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-bottom: 15px;
                }
                .btn-voltar:hover {
                    background: #5a6268;
                }
            </style>
        </head>
        <body>
            <button class="btn-voltar" onclick="window.close()">← Fechar</button>
            
            <div class="header">
                <h1>📷 Fotos da Vistoria</h1>
                <p><strong>Endereço:</strong> ${vistoria.endereco}</p>
                <p><strong>Data:</strong> ${formatarData(vistoria.data)}</p>
                <p><strong>Vistoriador:</strong> ${vistoria.vistoriador}</p>
                <p><strong>Total de Fotos:</strong> ${vistoria.fotos.length}</p>
            </div>

            <div class="fotos-container">
                ${vistoria.fotos.map(foto => `
                    <div class="foto-item">
                        <img src="${foto.url}" alt="${foto.nome}">
                    </div>
                `).join('')}
            </div>
        </body>
        </html>
    `;

    // Abrir nova janela
    const novaJanela = window.open('', '_blank', 'width=1200,height=800');
    novaJanela.document.write(paginaFotos);
    novaJanela.document.close();
}

// EXCLUIR VISTORIA
function excluirVistoria(vistoriaId) {
    if (!confirm('Tem certeza que deseja excluir esta vistoria? Esta ação não pode ser desfeita.')) return;

    vistorias = vistorias.filter(v => v.id !== vistoriaId);
    localStorage.setItem('vistorias_villares', JSON.stringify(vistorias));
    document.getElementById('lista-vistorias').innerHTML = renderizarListaVistorias();
    showAlert('Vistoria excluída com sucesso!', 'success');
}

// FUNÇÃO PARA MOSTRAR ALERTAS
function showAlert(message, type = 'info') {
    if (window.app && window.app.showAlert) {
        window.app.showAlert(message, type);
    } else {
        alert(message);
    }
}