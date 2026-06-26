const API_KEY_PLACEHOLDER = "";


const locais = [

    {
        nome: "CAPS — Centro de Atenção Psicossocial Infanto-Juvenil",
        tipo: ["sus", "caps"],
        icone: "🏥",
        cor: "#e8f0fe",
        desc: "Atendimento público e gratuito para crianças e adolescentes com transtornos mentais, incluindo TEA. Presentes em todos os municípios acima de 70 mil habitantes.",
        endereco: "Verifique o endereço na Prefeitura da sua cidade",
        telefone: "Consulte o CRAS local",
        site: "https://www.gov.br/saude/pt-br/acesso-a-informacao/acoes-e-programas/caps",
        horario: "Segunda a sexta, 8h às 17h"
    },

    {
        nome: "CRAS — Centro de Referência de Assistência Social",
        tipo: ["sus"],
        icone: "🏛️",
        cor: "#e6f4ea",
        desc: "Unidade pública que oferece apoio social, orientação sobre benefícios e cadastro no CadÚnico. Essencial para acessar o BPC/INSS.",
        endereco: "Presente em todos os municípios brasileiros",
        telefone: "156 (Central da Prefeitura)",
        site: "https://www.gov.br/cidadania/pt-br/acoes-e-programas/assistencia-social/protecao-social-basica/cras",
        horario: "Segunda a sexta, 8h às 17h"
    },

    {
        nome: "AMA — Associação de Amigos do Autista",
        tipo: ["associacao", "gratuito"],
        icone: "🤝",
        cor: "#fef3e2",
        desc: "Maior organização da América Latina voltada ao atendimento de pessoas com autismo. Oferece terapias, escola especializada e apoio à família.",
        endereco: "Rua Voluntários da Pátria, 4301 — Santana, São Paulo/SP",
        telefone: "(11) 2959-6611",
        site: "https://www.ama.org.br",
        horario: "Segunda a sexta, 8h às 17h"
    },

    {
        nome: "APAE — Associação de Pais e Amigos dos Excepcionais",
        tipo: ["associacao", "sus"],
        icone: "🌟",
        cor: "#f3e8fd",
        desc: "Rede nacional com mais de 2.200 unidades. Oferece atendimento educacional, terapêutico e social para pessoas com deficiência intelectual e autismo.",
        endereco: "Presente em mais de 2.000 municípios brasileiros",
        telefone: "Busque a APAE da sua cidade em apae.org.br",
        site: "https://apae.com.br",
        horario: "Varia por unidade"
    },

    {
        nome: "Núcleo de Apoio ao TEA — NATEA",
        tipo: ["clinica"],
        icone: "🧩",
        cor: "#fce4ec",
        desc: "Clínica especializada em diagnóstico e intervenção precoce para crianças e adultos com TEA. Equipe multidisciplinar com psicólogos, fonoaudiólogos e terapeutas ocupacionais.",
        endereco: "Consulte unidade mais próxima no site",
        telefone: "Varia por unidade",
        site: "https://natea.org.br",
        horario: "Segunda a sábado, 8h às 18h"
    },

    {
        nome: "Meu INSS — Solicitação de Benefícios",
        tipo: ["sus"],
        icone: "📋",
        cor: "#e8f0fe",
        desc: "Portal oficial do INSS para solicitação do BPC (Benefício de Prestação Continuada) para pessoas com deficiência, incluindo TEA.",
        endereco: "Online: meu.inss.gov.br | Telefone: 135",
        telefone: "135 (gratuito, 24h)",
        site: "https://meu.inss.gov.br",
        horario: "Atendimento 24h pelo site e app"
    }


]

function irPara(id, btn) {
    document.querySelectorAll('.secao').forEach(s => s.classList.remove('ativa'));
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('ativo'));
    document.getElementById(id).classList.add('ativa');
    if (btn) btn.classList.add('ativo');
}

function rederizarLocais(filtro) {
    const Lista = document.getElementById('lista-locais');
    const itens = filtro === 'todos' ? locais : locais.filter(l => l.tipo.includes(filtro));
    lista.innerHTML = itens.map((l, i) => `
    <div class="local-icone" style="background:${l.cor}">${l.icone}</div>
<div class="local-info" style="flex:1">
<h3>${l.nome}</h3>
<p>${l.desc}</p>
<p style="margin-top:6px">📍${l.endereco}</p>

<p style="margin-top:6px">📍 ${l.endereco}</p>
        <div class="tags">
          ${l.tipo.includes('sus') ? '<span class="tag sus">SUS</span>' : ''}
          ${l.tipo.includes('gratuito') ? '<span class="tag gratuito">Gratuito</span>' : ''}
          ${l.tipo.includes('clinica') ? '<span class="tag particular">Clínica</span>' : ''}
          ${l.tipo.includes('associacao') ? '<span class="tag telefone">Associação</span>' : ''}
          ${l.tipo.includes('caps') ? '<span class="tag sus">CAPS</span>' : ''}
        </div>
        <button class="btn-contato" onclick="abrirModal(${locais.indexOf(l)})">📞 Ver contato</button>
      </div>
    </div>
  `).join('');
}

function filtrarLocais(f, btn) {
    document.querySelectorAll('.filtro button').forEach(b => b.classList.remove('ativo-f'));
    btn.classList.add('ativo-f');
    renderizarLocais(f);
}

function abrirModal(i) {
    const l = locais[i];
    document.getElementById('modal-titulo').textContent = l.nome;
    document.getElementById('modal-desc').textContent = l.desc;
    document.getElementById('modal-linhas').innerHTML = `
    <div class="linha"><span>📍 Endereço</span><span>${l.endereco}</span></div>
    <div class="linha"><span>📞 Telefone</span><span>${l.telefone}</span></div>
    <div class="linha"><span>🕐 Horário</span><span>${l.horario}</span></div>
    <div class="linha"><span>🌐 Site</span><span><a href="${l.site}" target="_blank" style="color:var(--azul)">${l.site.replace('https://', '')}</a></span></div>
  `;
    document.getElementById('modal').classList.add('aberto');
}

function fecharModal() {
    document.getElementById('modal').classList.remove('aberto');
}

document.getElementById('modal').addEventListener('click', function (e) {
    if (e.target === this) fecharModal();
});

// CHAT
const historico = [];

async function enviarMensagem() {
    const input = document.getElementById('chat-input');
    const texto = input.value.trim();
    if (!texto) return;
    input.value = '';
    adicionarMsg(texto, 'user');
    historico.push({ role: 'user', content: texto });
    const carregando = adicionarMsg('Digitando...', 'bot carregando');
    try {
        const resp = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1000,
                system: `Você é um assistente especializado em apoio ao Transtorno do Espectro Autista (TEA) no Brasil. Responda de forma clara, empática e acessível. Use linguagem simples. Forneça informações práticas sobre rotinas, terapias, direitos, benefícios e apoio emocional. Quando relevante, mencione leis brasileiras (Lei 12.764/2012, Estatuto da Pessoa com Deficiência). Nunca substitua orientação médica profissional. Respostas curtas e objetivas, máximo 4 parágrafos.`,
                messages: historico
            })
        });
        const data = await resp.json();
        const resposta = data.content?.[0]?.text || 'Desculpe, não consegui processar. Tente novamente.';
        carregando.remove();
        adicionarMsg(resposta, 'bot');
        historico.push({ role: 'assistant', content: resposta });
    } catch {
        carregando.remove();
        adicionarMsg('Erro de conexão. Verifique sua internet e tente novamente.', 'bot');
    }
}

function adicionarMsg(texto, tipo) {
    const caixa = document.getElementById('chat-mensagens');
    const div = document.createElement('div');
    div.className = 'msg ' + tipo;
    div.textContent = texto;
    caixa.appendChild(div);
    caixa.scrollTop = caixa.scrollHeight;
    return div;
}

function enviarSugestao(texto) {
    document.getElementById('chat-input').value = texto;
    enviarMensagem();
}

renderizarLocais('todos');

