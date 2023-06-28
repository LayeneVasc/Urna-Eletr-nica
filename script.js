let etapas = [
    {
        titulo: 'VEREADOR',
        numeros: 2,
        candidatos: [
            {
                numero: '23',
                nome: 'Cleiton Farora',
                partido: 'Partido dos Farofeiros(pf)',
                fotos: [
                    {url: 'http://3.bp.blogspot.com/-Bdpxhdld4Wg/UtLGoZYyeBI/AAAAAAAAAWg/nHsvIyWVlyU/s1600/DSC07105.JPG', legenda: 'Vereador'}
                ]
            },
            {
                numero: '31',
                nome: 'Pietro Caviar',
                partido: 'Partido do caviar(pc)',
                fotos: [
                    {url: 'https://fthmb.tqn.com/k3AE6iCym5xsr8CHDBg-agFciw4=/2001x1498/filters:fill(auto,1)/GettyImages-97541004-58162ff43df78cc2e8918b51.jpg', legenda: 'Vereador'}
                ]
            },
           
        ]
    },
  
]


// separando as classes nas variaveis para controle
let seuVotoPara = document.querySelector('.seuVoto span');
let cargo = document.querySelector('.cargo span');
let descricao = document.querySelector('.descricao');
let aviso = document.querySelector('.rodape_tela');
let lateral = document.querySelector('.div_right');
let numeros = document.querySelector('.div_numeros');

let etapaAtual = 0;
let numero = ''; // numero que será digitado
let votoBranco = false;
let corrigir = true;


function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    let numeroHtml = ''; // variavel pra colocar nos numeros
    numero = '';
    votoBranco = false;
    corrigir = true;

    for (let i = 0; i < etapa.numeros; i++) {
        if(i === 0){ // if para que a 1 posicao pisque
            numeroHtml += '<div class="numero pisca"></div>';   
        } else{
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];  
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero) {
            return true;
        }else{
            return false;
        }
    });
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    
    if(candidato.length > 0){
        candidato = candidato[0]; // caso tenha mais candidatos com o mesmo numero
        descricao.innerHTML = `Nome: ${candidato.nome} <br>Partido: ${candidato.partido}<br>`;
        if(candidato.vice !== undefined){ // se possuir vice
            descricao.innerHTML += `Vice: ${candidato.vice}`;    
        }
        
        let fotosHtml = '';
        for (const i in candidato.fotos) {
            if(candidato.fotos[i].small){ // caso tenha vice (ele deve ficar com a foto menor)
                fotosHtml += `<div class="div_image small">
                         <img src="img/${candidato.fotos[i].url}" alt="">
                         ${candidato.fotos[i].legenda}</div>`;    
            } else{
                fotosHtml += `<div class="div_image">
                             <img src="http://3.bp.blogspot.com/-Bdpxhdld4Wg/UtLGoZYyeBI/AAAAAAAAAWg/nHsvIyWVlyU/s1600/DSC07105.JPG" alt="">
                             ${candidato.fotos[i].legenda}</div>`;    
            }
        }
        lateral.innerHTML = fotosHtml;
    }else{ // se não achar candidato 
        descricao.innerHTML = '<div class="aviso_grande pisca"><br>VOTO NULO</div>';
    }
}

function clicou(n){
    let numeroP = document.querySelector('.numero.pisca');
    if(numeroP !== null) {
        numeroP.innerHTML = n;
        numero += n;

        numeroP.classList.remove('pisca');
        if(numeroP.nextElementSibling !== null){
            numeroP.nextElementSibling.classList.add('pisca');
        } else{
            atualizaInterface();
        }
    }    
}

function branco(){
    if(numero === ''){
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso_grande pisca">VOTO EM BRANCO</div>';            
    } else{
        alert('Para votar em BRANCO \no campo de voto deve estar vazio.\n'+ 
            'Aperte CORRIGE para apagar o campo de voto.');
    }
}

function corrige() {
    comecarEtapa();
}


function confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    var cleitonVoto = document.getElementById('cleitonVoto');
    var pietroVoto = document.getElementById("pietroVoto");
    var qntVotoCleiton = 0;
    var qntVotoPietro = 0;
    if(votoBranco){
        votoConfirmado = true;
        console.log('Confirmando como voto BRANCO');
    } else if(numero.length === etapa.numeros){
       if(numero == '23'){
            qntVotoCleiton++;
          }
          if(numero == '31'){
            qntVotoPietro++;
          }
        cleitonVoto.innerHTML = qntVotoCleiton;
        pietroVoto.innerHTML = qntVotoPietro;
        votoConfirmado = true;
        console.log('Confirmando como '+ numero);    
    }
    
    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
            
          
        } else{
            corrigir = false;
            document.querySelector('.tela').innerHTML = 
              '<div class="aviso_gigante pisca">FIM</div>';
          document.querySelector('.teclado').innerHTML = 
              '<button onclick= recarregar()>VOTAR NOVAMENTE</button>';
        }
    }
}


comecarEtapa();

function recarregar() {
    location.reload(); // Recarrega a página
}
