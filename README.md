# ⚙️ ENGENHOCA: A Oficina do Tempo

Jogo educacional interativo sobre **Máquinas Simples** para alunos do **7º ano — Ensino Fundamental (Ciências da Natureza)**.

Parte do projeto **Ciência Plural** — [cienciaplural.com.br](https://cienciaplural.com.br)

---

## 🎯 Alinhamento Curricular

**Habilidade BNCC:** EF07CI01 — Discutir a aplicação, ao longo da história, das máquinas simples e propor soluções e invenções para a realização de tarefas mecânicas cotidianas.

**Descritores SAEB:** E1A5 (reconhecer a aplicação das máquinas simples ao longo da história) · E1B7 (relacionar máquinas simples a dispositivos complexos).

**Unidade temática:** Matéria e Energia — Máquinas simples.

---

## 🎮 Estrutura do Jogo

O estudante encontra a oficina abandonada do Mestre Arquimedes e precisa dominar os segredos das seis máquinas simples para consertar uma máquina do tempo quebrada.

| Fase | Nome | Nível | Objetivo pedagógico | Questões |
|------|------|-------|---------------------|----------|
| 1 | A Oficina Esquecida | Fácil | Identificar máquinas simples no cotidiano | 12 |
| 2 | O Diário do Mestre | Intermediário | Compreender princípios de funcionamento | 12 |
| 3 | Viagem no Tempo | Intermediário-Difícil | Contextualizar historicamente | 8 + linha do tempo |
| 4 | A Máquina por Dentro | Difícil | Analisar máquinas complexas | 10 |
| 5 | O Inventor é Você! | Desafiador | Criar soluções com máquinas simples | 3 desafios |

**Total:** 15 estrelas possíveis · Duração estimada: 20–30 minutos.

---

## ✨ Recursos Pedagógicos

- **Personagem guia:** Mestre Arquimedes — holograma de inventor que conduz o estudante com entusiasmo e acolhimento, sem punir o erro.
- **Cards explicativos** antes de cada desafio, com as 6 máquinas simples e seus princípios.
- **186 feedbacks individualizados por distrator** — cada alternativa errada recebe explicação específica de por que não é a resposta e por que a correta é.
- **43 dicas contextualizadas** — botão "💡 Preciso de uma dica!" em todas as questões (Fases 1–4) e na linha do tempo, sem custo.
- **Diálogos narrativos de transição** entre fases, com efeito de digitação.
- **Fase criativa** (Fase 5) — o estudante escolhe um problema real, combina 2 máquinas simples e dá nome à sua invenção, com feedback contextualizado por combinação.
- **Certificado personalizado** com nome do estudante, engenhoca criada, estrelas, faixa de desempenho (Mestre Inventor / Inventor Habilidoso / Aprendiz de Inventor / Inventor em Treinamento) e seção "O que você aprendeu".

---

## ♿ Acessibilidade

- Machine cards usam `<button>` semântico com `aria-label` e `aria-pressed`.
- Botões da linha do tempo com `aria-label` descritivo.
- Feedbacks com `role="alert"` para leitores de tela.
- Feedback não depende apenas de cor: ícones ✅/❌ + texto em todas as fases.
- Contraste WCAG AA verificado em textos secundários.

---

## 🛠️ Tecnologias

- React 18 (arquivo único `src/App.jsx`)
- Vite
- CSS-in-JS (inline styles)
- Google Fonts (Lora)
- Deploy: Netlify

---

## 🚀 Como rodar localmente

```bash
npm install
npm run dev
```

## 📦 Como fazer deploy no Netlify

1. Suba este repositório no GitHub
2. No Netlify, clique em **"Add new site" → "Import an existing project"**
3. Conecte seu GitHub e selecione este repositório
4. O Netlify detecta automaticamente as configurações do `netlify.toml`
5. Clique em **Deploy** — pronto!

---

## 📄 Licença

Uso educacional. Parte do projeto [Ciência Plural](https://cienciaplural.com.br).
