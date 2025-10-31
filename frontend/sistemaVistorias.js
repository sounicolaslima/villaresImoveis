//===============================================================
// SISTEMA DE VISTORIAS - CORREÇÕES ESPECÍFICAS
//===============================================================

let vistorias = JSON.parse(localStorage.getItem('vistorias_villares')) || [];
let fotosSelecionadas = [];
let uploadEmAndamento = false;

// FUNÇÕES BÁSICAS
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

// CARREGAR PÁGINA PRINCIPAL
function loadVistoriasPage() {
    const content = document.getElementById('page-content');
    if (!content) return;

    content.innerHTML = `
        <div class="page-container">
            <div class="page-header">
                <button class="btn btn-secondary" onclick="goBack()">← VOLTAR</button>
                <h1>📷 SISTEMA DE VISTORIAS</h1>
            </div>

            <div class="main-container">
                <form id="vistoria-form">
                    <div class="section-header">
                        <h3>DADOS DA VISTORIA</h3>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Endereço do Imóvel</label>
                                <input type="text" id="enderecoVistoria" class="form-control" placeholder="Endereço completo" required>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label>Data</label>
                                <input type="date" id="dataVistoria" class="form-control" value="${new Date().toISOString().split('T')[0]}" required>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group">
                                <label>Vistoriador</label>
                                <input type="text" id="vistoriador" class="form-control" placeholder="Nome" required>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Observações</label>
                        <textarea id="observacoesVistoria" class="form-control" rows="2" placeholder="Observações..."></textarea>
                    </div>

                    <div class="section-header">
                        <h3>FOTOS <span id="fotos-count" class="badge badge-primary" style="display: none;">0</span></h3>
                    </div>

                    <div class="form-group">
                        <div class="upload-area" id="upload-area">
                            <div class="upload-content">
                                <i class="fas fa-cloud-upload-alt"></i>
                                <p>Clique para selecionar fotos</p>
                                <small>Arraste ou clique para adicionar</small>
                            </div>
                            <input type="file" id="fotosInput" multiple accept="image/*" style="position: absolute; width: 100%; height: 100%; opacity: 0; cursor: pointer; top: 0; left: 0;">
                        </div>
                        
                        <div id="fotos-preview-section" class="mt-2" style="display: none;">
                            <button type="button" class="btn btn-info btn-sm" onclick="visualizarFotosSelecionadas()">
                                👁️ Ver Fotos (<span id="fotos-count-preview">0</span>)
                            </button>
                            <button type="button" class="btn btn-warning btn-sm ml-2" onclick="limparFotosSelecionadas()">
                                🗑️ Limpar
                            </button>
                        </div>
                    </div>

                    <div class="text-center mt-3">
                        <button type="button" class="btn btn-primary btn-lg" onclick="salvarVistoria()">
                            💾 SALVAR VISTORIA
                        </button>
                    </div>
                </form>

                <div class="section-header mt-4">
                    <h3>VISTORIAS SALVAS</h3>
                </div>

                <div id="lista-vistorias">
                    ${renderizarListaVistorias()}
                </div>
            </div>
        </div>
    `;

    configurarUpload();
}

// CONFIGURAR UPLOAD - VERSÃO SIMPLIFICADA
function configurarUpload() {
    const uploadArea = document.getElementById('upload-area');
    const fotosInput = document.getElementById('fotosInput');

    if (!uploadArea || !fotosInput) return;

    // Remove event listeners anteriores
    const novoFotosInput = fotosInput.cloneNode(true);
    fotosInput.parentNode.replaceChild(novoFotosInput, fotosInput);

    // Configura novos event listeners
    uploadArea.addEventListener('click', () => {
        if (!uploadEmAndamento) {
            novoFotosInput.click();
        }
    });

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
        if (!uploadEmAndamento) {
            processarArquivos(e.dataTransfer.files);
        }
    });

    novoFotosInput.addEventListener('change', (e) => {
        if (!uploadEmAndamento) {
            processarArquivos(e.target.files);
        }
    });
}

// PROCESSAR ARQUIVOS - CORREÇÃO DO PROBLEMA
function processarArquivos(files) {
    if (!files.length) return;

    // LIMPA AS FOTOS ANTERIORES - ESSA É A CORREÇÃO PRINCIPAL
    fotosSelecionadas = [];

    const arquivosValidos = Array.from(files).filter(file => {
        if (!file.type.startsWith('image/')) {
            showAlert(`Arquivo "${file.name}" não é uma imagem!`, 'warning');
            return false;
        }
        if (file.size > 10 * 1024 * 1024) {
            showAlert(`Arquivo "${file.name}" excede 10MB!`, 'warning');
            return false;
        }
        return true;
    });

    if (arquivosValidos.length > 0) {
        // ADICIONA TODOS OS ARQUIVOS VÁLIDOS - CORREÇÃO DO PROBLEMA
        fotosSelecionadas = [...arquivosValidos];
        
        document.getElementById('fotos-count').textContent = fotosSelecionadas.length;
        document.getElementById('fotos-count').style.display = 'inline-block';
        document.getElementById('fotos-count-preview').textContent = fotosSelecionadas.length;
        document.getElementById('fotos-preview-section').style.display = 'block';
        showAlert(`${fotosSelecionadas.length} foto(s) selecionada(s)!`, 'success');
    } else {
        // Se não há arquivos válidos, limpa a seleção
        limparFotosSelecionadas();
    }
}

// LIMPAR FOTOS SELECIONADAS
function limparFotosSelecionadas() {
    fotosSelecionadas = [];
    document.getElementById('fotosInput').value = '';
    document.getElementById('fotos-count').style.display = 'none';
    document.getElementById('fotos-preview-section').style.display = 'none';
    showAlert('Fotos removidas!', 'info');
}

// SALVAR VISTORIA - VERSÃO CORRIGIDA
async function salvarVistoria() {
    if (uploadEmAndamento) {
        showAlert('Upload em andamento, aguarde...', 'warning');
        return;
    }

    const endereco = document.getElementById('enderecoVistoria').value.trim();
    const data = document.getElementById('dataVistoria').value;
    const vistoriador = document.getElementById('vistoriador').value.trim();
    const observacoes = document.getElementById('observacoesVistoria').value.trim();

    if (!endereco || !data || !vistoriador) {
        showAlert('Preencha todos os campos obrigatórios!', 'warning');
        return;
    }

    if (!fotosSelecionadas.length) {
        showAlert('Adicione pelo menos uma foto!', 'warning');
        return;
    }

    uploadEmAndamento = true;
    const btnSalvar = document.querySelector('.btn-primary');
    const textoOriginal = btnSalvar.innerHTML;
    btnSalvar.innerHTML = '⏳ SALVANDO...';
    btnSalvar.disabled = true;

    try {
        showAlert('Iniciando upload das fotos...', 'info');
        
        const fotosUrls = await uploadParaCloudinary();

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

        showAlert('✅ Vistoria salva com sucesso!', 'success');
        limparFormulario();
        document.getElementById('lista-vistorias').innerHTML = renderizarListaVistorias();

    } catch (error) {
        console.error('Erro ao salvar vistoria:', error);
        showAlert('❌ Erro ao salvar: ' + error.message, 'error');
    } finally {
        uploadEmAndamento = false;
        btnSalvar.innerHTML = textoOriginal;
        btnSalvar.disabled = false;
    }
}

// UPLOAD CLOUDINARY - VERSÃO SIMPLIFICADA
async function uploadParaCloudinary() {
    const urls = [];
    
    for (let i = 0; i < fotosSelecionadas.length; i++) {
        const file = fotosSelecionadas[i];
        
        showAlert(`Enviando foto ${i + 1} de ${fotosSelecionadas.length}...`, 'info');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'villares_vistorias');
        formData.append('cloud_name', 'da5gy1gds');

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/da5gy1gds/image/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Upload falhou: ${response.status}`);
            }

            const data = await response.json();
            urls.push({
                url: data.secure_url,
                public_id: data.public_id,
                nome: file.name
            });

        } catch (error) {
            console.error(`Erro no upload da foto ${file.name}:`, error);
            throw new Error(`Falha no upload de ${file.name}. Tente novamente.`);
        }
    }

    return urls;
}

// LIMPAR FORMULÁRIO
function limparFormulario() {
    document.getElementById('vistoria-form').reset();
    limparFotosSelecionadas();
}

// RENDERIZAR LISTA - GARANTIR QUE AS FUNÇÕES ESTEJAM ACESSÍVEIS
function renderizarListaVistorias() {
    if (!vistorias.length) {
        return `<div class="alert alert-info text-center">Nenhuma vistoria cadastrada</div>`;
    }

    return `
        <div class="search-bar mb-3">
            <input type="text" id="search-vistorias" class="form-control" placeholder="🔍 Pesquisar..." onkeyup="filtrarVistorias()">
        </div>
        <div id="vistorias-list">
            ${vistorias.map(v => `
                <div class="vistoria-item" data-endereco="${v.endereco.toLowerCase()}" data-vistoriador="${v.vistoriador.toLowerCase()}">
                    <div class="vistoria-item-header">
                        <div class="vistoria-item-info">
                            <h5>${v.endereco}</h5>
                            <div class="vistoria-meta">
                                <span>📅 ${formatarData(v.data)}</span>
                                <span>👤 ${v.vistoriador}</span>
                                <span>📸 ${v.fotos.length} foto(s)</span>
                            </div>
                            ${v.observacoes ? `<div class="vistoria-observacoes">${v.observacoes}</div>` : ''}
                        </div>
                        <div class="vistoria-item-actions">
                            <button class="btn btn-primary btn-sm" onclick="visualizarVistoriaCompleta('${v.id}')">👁️ Ver</button>
                            <button class="btn btn-success btn-sm" onclick="baixarTodasFotos('${v.id}')">📥 Baixar</button>
                            <button class="btn btn-danger btn-sm" onclick="excluirVistoriaCompleta('${v.id}')">🗑️</button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// FUNÇÕES PARA OS BOTÕES - GARANTIR QUE ESTEJAM NO ESCOPO GLOBAL

// VISUALIZAR VISTORIA COMPLETA
function visualizarVistoriaCompleta(vistoriaId) {
    const vistoria = vistorias.find(v => v.id === vistoriaId);
    if (!vistoria) {
        showAlert('Vistoria não encontrada!', 'error');
        return;
    }

    const fotosHTML = vistoria.fotos.map((foto, index) => `
        <div class="foto-modal-item">
            <img src="${foto.url}" alt="Foto ${index + 1}" style="width: 100%; height: 200px; object-fit: cover;">
            <div class="foto-info" style="padding: 10px; font-size: 12px; color: #666;">
                ${foto.nome || `Foto ${index + 1}`}
            </div>
        </div>
    `).join('');

    const pagina = `
        <html>
        <head>
            <title>Fotos - ${vistoria.endereco}</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    padding: 20px; 
                    background: #f5f5f5; 
                    margin: 0; 
                }
                .header { 
                    background: white; 
                    padding: 20px; 
                    border-radius: 10px; 
                    margin-bottom: 20px; 
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .fotos-grid { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
                    gap: 15px; 
                    padding: 10px;
                }
                .foto-modal-item { 
                    background: white; 
                    border-radius: 8px; 
                    overflow: hidden; 
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1); 
                }
                .btn-voltar { 
                    background: #6c757d; 
                    color: white; 
                    border: none; 
                    padding: 10px 20px; 
                    border-radius: 5px; 
                    cursor: pointer; 
                    margin-bottom: 15px; 
                }
            </style>
        </head>
        <body>
            <button class="btn-voltar" onclick="window.close()">← Fechar</button>
            <div class="header">
                <h1>📷 ${vistoria.endereco}</h1>
                <p>📅 ${formatarData(vistoria.data)} | 👤 ${vistoria.vistoriador} | 📸 ${vistoria.fotos.length} foto(s)</p>
                ${vistoria.observacoes ? `<p><strong>Observações:</strong> ${vistoria.observacoes}</p>` : ''}
            </div>
            <div class="fotos-grid">${fotosHTML}</div>
        </body>
        </html>
    `;

    const janela = window.open('', '_blank', 'width=1200,height=800');
    janela.document.write(pagina);
    janela.document.close();
}

// EXCLUIR VISTORIA COMPLETA
function excluirVistoriaCompleta(vistoriaId) {
    if (!confirm('Tem certeza que deseja excluir esta vistoria? Esta ação não pode ser desfeita.')) {
        return;
    }

    const vistoriaIndex = vistorias.findIndex(v => v.id === vistoriaId);
    if (vistoriaIndex === -1) {
        showAlert('Vistoria não encontrada!', 'error');
        return;
    }

    vistorias.splice(vistoriaIndex, 1);
    localStorage.setItem('vistorias_villares', JSON.stringify(vistorias));
    
    // Atualiza a lista na interface
    document.getElementById('lista-vistorias').innerHTML = renderizarListaVistorias();
    
    showAlert('✅ Vistoria excluída com sucesso!', 'success');
}

async function baixarTodasFotos(vistoriaId) {
    const vistoria = vistorias.find(v => v.id === vistoriaId);
    if (!vistoria || !vistoria.fotos.length) {
        showAlert('Nenhuma foto encontrada para download!', 'warning');
        return;
    }

    showAlert(`🔄 Preparando download de ${vistoria.fotos.length} fotos...`, 'info');

    try {
        // Criar um ZIP com todas as fotos
        await baixarFotosComoZip(vistoria);
        
    } catch (error) {
        console.error('Erro durante o download:', error);
        // Fallback: baixar fotos individualmente se o ZIP falhar
        await baixarFotosIndividualmente(vistoria);
    }
}

// BAIXAR FOTOS COMO ZIP (MELHOR OPÇÃO)
async function baixarFotosComoZip(vistoria) {
    const JSZip = window.JSZip;
    
    if (!JSZip) {
        // Se JSZip não estiver disponível, usa fallback
        throw new Error('JSZip não carregado');
    }

    const zip = new JSZip();
    const pasta = zip.folder(`vistoria_${vistoria.endereco.replace(/[^a-zA-Z0-9]/g, '_')}`);

    showAlert('📦 Compactando fotos...', 'info');

    // Adicionar cada foto ao ZIP
    for (let i = 0; i < vistoria.fotos.length; i++) {
        const foto = vistoria.fotos[i];
        
        try {
            const response = await fetch(foto.url);
            const blob = await response.blob();
            
            // Nome do arquivo sem caracteres especiais
            const nomeArquivo = `foto_${i + 1}.jpg`;
            pasta.file(nomeArquivo, blob);
            
            showAlert(`Adicionando foto ${i + 1} de ${vistoria.fotos.length}...`, 'info');
            
        } catch (error) {
            console.error(`Erro ao baixar foto ${i + 1}:`, error);
        }
    }

    // Gerar o ZIP
    const zipBlob = await zip.generateAsync({ 
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 }
    });

    // Criar link de download
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vistoria_${vistoria.endereco.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().getTime()}.zip`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Limpar URL
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    
    showAlert('✅ Download do ZIP concluído!', 'success');
}

// BAIXAR FOTOS INDIVIDUALMENTE (FALLBACK)
async function baixarFotosIndividualmente(vistoria) {
    showAlert('📥 Iniciando download individual das fotos...', 'info');

    for (let i = 0; i < vistoria.fotos.length; i++) {
        const foto = vistoria.fotos[i];
        
        try {
            const response = await fetch(foto.url);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `vistoria_${vistoria.endereco.replace(/[^a-zA-Z0-9]/g, '_')}_foto_${i + 1}.jpg`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Limpar URL
            setTimeout(() => window.URL.revokeObjectURL(url), 1000);
            
            showAlert(`📸 Baixando foto ${i + 1} de ${vistoria.fotos.length}...`, 'info');
            
            // Delay entre downloads para não sobrecarregar
            if (i < vistoria.fotos.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            
        } catch (error) {
            console.error(`Erro ao baixar foto ${i + 1}:`, error);
            showAlert(`❌ Erro ao baixar foto ${i + 1}`, 'error');
        }
    }
    
    showAlert('✅ Todos os downloads foram iniciados!', 'success');
}

// BAIXAR FOTO ÚNICA (PARA QUANDO O USUÁRIO CLICAR EM UMA FOTO ESPECÍFICA)
async function baixarFotoUnica(urlFoto, nomeFoto, index, totalFotos) {
    try {
        const response = await fetch(urlFoto);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = nomeFoto;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Limpar URL
        setTimeout(() => window.URL.revokeObjectURL(url), 1000);
        
        showAlert(`✅ Foto ${index} de ${totalFotos} baixada!`, 'success');
        
    } catch (error) {
        console.error('Erro ao baixar foto:', error);
        showAlert('❌ Erro ao baixar a foto', 'error');
    }
}

// ATUALIZAR A FUNÇÃO visualizarVistoriaCompleta PARA INCLUIR BOTÕES DE DOWNLOAD
function visualizarVistoriaCompleta(vistoriaId) {
    const vistoria = vistorias.find(v => v.id === vistoriaId);
    if (!vistoria) {
        showAlert('Vistoria não encontrada!', 'error');
        return;
    }

    const fotosHTML = vistoria.fotos.map((foto, index) => `
        <div class="foto-modal-item">
            <img src="${foto.url}" alt="Foto ${index + 1}" style="width: 100%; height: 200px; object-fit: cover;">
            <div class="foto-info" style="padding: 10px; font-size: 12px; color: #666;">
                ${foto.nome || `Foto ${index + 1}`}
                <br>
                <button onclick="baixarFotoUnica('${foto.url}', 'vistoria_${vistoria.endereco.replace(/[^a-zA-Z0-9]/g, '_')}_foto_${index + 1}.jpg', ${index + 1}, ${vistoria.fotos.length})" 
                        style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-top: 5px; font-size: 10px;">
                    📥 Baixar Esta Foto
                </button>
            </div>
        </div>
    `).join('');

    const pagina = `
        <html>
        <head>
            <title>Fotos - ${vistoria.endereco}</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    padding: 20px; 
                    background: #f5f5f5; 
                    margin: 0; 
                }
                .header { 
                    background: white; 
                    padding: 20px; 
                    border-radius: 10px; 
                    margin-bottom: 20px; 
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .fotos-grid { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
                    gap: 15px; 
                    padding: 10px;
                }
                .foto-modal-item { 
                    background: white; 
                    border-radius: 8px; 
                    overflow: hidden; 
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1); 
                }
                .btn-voltar { 
                    background: #6c757d; 
                    color: white; 
                    border: none; 
                    padding: 10px 20px; 
                    border-radius: 5px; 
                    cursor: pointer; 
                    margin-bottom: 15px; 
                }
                .btn-download-all {
                    background: #28a745;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-left: 10px;
                }
            </style>
        </head>
        <body>
            <div>
                <button class="btn-voltar" onclick="window.close()">← Fechar</button>
                <button class="btn-download-all" onclick="window.opener.baixarTodasFotos('${vistoriaId}')">📥 Baixar Todas as Fotos</button>
            </div>
            <div class="header">
                <h1>📷 ${vistoria.endereco}</h1>
                <p>📅 ${formatarData(vistoria.data)} | 👤 ${vistoria.vistoriador} | 📸 ${vistoria.fotos.length} foto(s)</p>
                ${vistoria.observacoes ? `<p><strong>Observações:</strong> ${vistoria.observacoes}</p>` : ''}
            </div>
            <div class="fotos-grid">${fotosHTML}</div>
            
            <script>
                function baixarFotoUnica(urlFoto, nomeFoto, index, totalFotos) {
                    fetch(urlFoto)
                        .then(response => response.blob())
                        .then(blob => {
                            const url = window.URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = nomeFoto;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            setTimeout(() => window.URL.revokeObjectURL(url), 1000);
                            alert('✅ Foto ' + index + ' de ' + totalFotos + ' baixada!');
                        })
                        .catch(error => {
                            console.error('Erro ao baixar foto:', error);
                            alert('❌ Erro ao baixar a foto');
                        });
                }
            </script>
        </body>
        </html>
    `;

    const janela = window.open('', '_blank', 'width=1200,height=800');
    janela.document.write(pagina);
    janela.document.close();
}

// ADICIONAR JSZip AO SEU HTML (necessário para o ZIP)
function carregarJSZip() {
    if (!window.JSZip) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
        script.integrity = 'sha512-XMVd28F1oH/O71fzwBnV7HucLxVWTq3Z4Y5nZ5OMr6Gx5Rk6RZgCrkQl3pDGhGdhCJqxzkYy1R1xrR6Q0VvTyw==';
        script.crossOrigin = 'anonymous';
        script.referrerPolicy = 'no-referrer';
        document.head.appendChild(script);
        
        script.onload = () => {
            console.log('JSZip carregado com sucesso!');
        };
        
        script.onerror = () => {
            console.log('Erro ao carregar JSZip, usando fallback...');
        };
    }
}

// Carregar JSZip quando a página carregar
document.addEventListener('DOMContentLoaded', carregarJSZip);

// GARANTIR QUE AS NOVAS FUNÇÕES ESTEJAM DISPONÍVEIS
window.baixarTodasFotos = baixarTodasFotos;
window.baixarFotosComoZip = baixarFotosComoZip;
window.baixarFotosIndividualmente = baixarFotosIndividualmente;
window.baixarFotoUnica = baixarFotoUnica;
window.carregarJSZip = carregarJSZip;