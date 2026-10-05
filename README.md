# Ventos Modernos — Uma Revisão Filosófica

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.23147405.svg)](https://doi.org/10.5281/zenodo.23147405)

Jogo didático em HTML5 sobre a formação do pensamento moderno, feito para a
disciplina Fundamentos Filosóficos e Epistemológicos da Psicologia da
Universidade de Fortaleza (UNIFOR).

Em três capítulos, o jogador percorre o caminho que vai da dúvida metódica à
filosofia crítica, respondendo a questões que exigem compreensão dos conceitos,
e não memorização.

**Jogar:** https://fmj79.github.io/Ventos-Modernos/

**Código-fonte:** https://github.com/fmj79/Ventos-Modernos

## Os três capítulos

| Capítulo | Título | Tema | Protagonista |
|---|---|---|---|
| I | O Labirinto de Descartes | Racionalismo — tese | Raquel |
| II | A Cruzada Sensorial | Empirismo — antítese | Mari |
| III | O Calvinista de Königsberg | Filosofia crítica — síntese | Raquel e Mari |

O percurso dialoga com Descartes (*Meditações Metafísicas*, 1641), Bacon
(*Novum Organum*, 1620), Locke (*Ensaio sobre o Entendimento Humano*, 1690),
Hume (*Tratado da Natureza Humana*, 1739-40) e Kant (*Crítica da Razão Pura*,
1781).

## Como jogar

No computador, com teclado:

- **WASD** ou **setas** para andar
- **E**, **ESPAÇO** ou **ENTER** para interagir, avançar diálogos e confirmar
- **1**, **2**, **3** para responder às questões
- **ESC** para voltar ao menu

No celular e no tablet, controles de toque aparecem sozinhos: um direcional à
esquerda e os botões A, 1, 2 e 3 à direita.

O progresso de cada capítulo fica salvo no próprio navegador.

## Como é feito

- HTML5 com Canvas 2D e JavaScript, sem bibliotecas externas.
- Resolução interna de 320×180, ampliada para a tela. Todos os gráficos são
  desenhados pixel a pixel pelo próprio código — não há arquivos de imagem.
- Áudio gerado em tempo real pela Web Audio API: síntese FM para os efeitos e
  um leitor de MIDI próprio para as músicas.
- Site estático, sem servidor e sem coleta de dados.

```
index.html           menu inicial
stage1/index.html    Capítulo I
stage2/index.html    Capítulo II
stage3/index.html    Capítulo III
final.html           tela de conclusão
creditos.html        créditos completos
touch.js             controles de toque para celular e tablet
```

Para rodar localmente, basta abrir o `index.html` no navegador. Para servir a
pasta inteira, `python -m http.server` também funciona.

## Músicas

Todas de compositores em domínio público, a partir de partituras livres. Os
arquivos MIDI foram gerados com o LilyPond e são sintetizados pelo próprio
navegador, sem gravações de terceiros.

- **Capítulo I** — François Couperin, *Premier Prélude*, de *L'Art de toucher
  le clavecin* (1716). Partitura de Nicolas Sceaux, publicada pelo
  [Mutopia Project](https://www.mutopiaproject.org) sob licença CC BY 2.5.
- **Capítulo II** — Henry Purcell, *Fairest Isle*, de *King Arthur* (1691).
  Edição de Sebastian Brosig, publicada pelo Mutopia Project em domínio público.
- **Capítulo III** — Heinrich Schütz (1585-1672), peça coral a cinco vozes, a
  partir de partitura em domínio público.

## Personagens

As protagonistas foram inspiradas nas monitoras da disciplina, a quem o jogo é
dedicado: **Raquel D'Anne Marie Vieira Leite Pereira** e **Mariana Penido de Sá
Pessoa**. Os avatares são desenhos originais em pixel art, criados para o jogo.

## Referências e homenagens

O jogo cita, em texto, obras da cultura de massa: *JoJo's Bizarre Adventure*,
de Hirohiko Araki (Shueisha / David Production), de onde vêm os Stands dos
antagonistas; o Yes, nos títulos *Close to the Edge* e *The Ancient*; Jimi
Hendrix, em *Are You Experienced*; e *Phantasy Star IV* (Sega, 1993), na fila
da equipe do terceiro capítulo. Todas as marcas e obras mencionadas pertencem a
seus respectivos autores e detentores de direitos. Este é um trabalho didático
sem fins lucrativos, não oficial e sem vínculo com os titulares, que não
reproduz material protegido. A página de créditos traz a lista completa.

## Licença

Licenciado sob
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt):
é livre compartilhar e adaptar, desde que se cite a autoria, não se use para
fins comerciais e se mantenha a mesma licença nas obras derivadas.

O arquivo [LICENSE](LICENSE) traz o texto legal completo da licença. O
[AVISO-DE-LICENCA.txt](AVISO-DE-LICENCA.txt) resume as condições em português e
delimita o alcance: o que é de autoria própria e o que pertence a terceiros,
como as partituras, as fontes tipográficas e as obras citadas nos créditos.

## Como citar

JESUINO, Filipe. **Ventos Modernos: uma revisão filosófica**.
Fortaleza: Universidade de Fortaleza, 2026. Jogo didático em HTML5. Disponível
em: https://fmj79.github.io/Ventos-Modernos/. DOI: https://doi.org/10.5281/zenodo.23147405.

O DOI acima é o de conceito do Zenodo: ele resolve sempre para a versão mais
recente. Para citar uma versão específica, use o DOI dessa versão, indicado na
página do depósito.

O arquivo [`CITATION.cff`](CITATION.cff) traz os mesmos dados em formato
legível por máquina, usado pelo GitHub e pelo Zenodo.

---

Prof. Dr. Filipe de Menezes Jesuino — Universidade de Fortaleza (UNIFOR)
Desenvolvido em diálogo com o Claude (Cowork), da Anthropic.
