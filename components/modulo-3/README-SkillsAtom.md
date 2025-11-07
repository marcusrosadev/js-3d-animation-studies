# 🎯 Átomo de Skills - Componente de Portfólio

Este componente cria uma visualização 3D interativa de suas skills/tecnologias no formato de um átomo, onde cada "elétron" representa uma stack que você trabalhou.

## 🚀 Características

- **Núcleo central**: Representa você/seus projetos
- **Elétrons orbitando**: Cada um é uma skill/tecnologia
- **Múltiplas órbitas**: Organize suas skills em diferentes níveis
- **Interação hover**: Mostra o nome da skill ao passar o mouse
- **Modal de detalhes**: Clique para ver experiência, projetos e mais informações
- **Animações suaves**: Rotação contínua e movimento orbital
- **Design responsivo**: Funciona em diferentes tamanhos de tela

## 📝 Como Personalizar

### 1. Editar os Dados das Skills

Edite o array `skillsData` no arquivo `SkillsAtom.tsx`:

```typescript
const skillsData: SkillData[] = [
  {
    id: 'react',
    name: 'React',
    experience: '3 anos',
    projects: ['E-commerce Platform', 'Dashboard Admin'],
    color: '#61dafb' // Cor da esfera
  },
  // Adicione suas skills aqui...
]
```

### 2. Adicionar Ícones (Opcional)

Você pode adicionar suporte a ícones SVG ou imagens:

```typescript
interface SkillData {
  // ... outros campos
  icon?: string // URL ou caminho do ícone
}
```

### 3. Ajustar Número de Órbitas

Por padrão, as skills são divididas em 2 órbitas. Você pode ajustar isso no componente `AtomScene`:

```typescript
// Dividir skills em 3 órbitas, por exemplo
const orbit1Skills = skillsData.slice(0, Math.ceil(skillsData.length / 3))
const orbit2Skills = skillsData.slice(Math.ceil(skillsData.length / 3), Math.ceil(skillsData.length * 2 / 3))
const orbit3Skills = skillsData.slice(Math.ceil(skillsData.length * 2 / 3))
```

### 4. Personalizar Cores e Estilos

Edite o arquivo `SkillsAtom.module.css` para ajustar:
- Cores do fundo
- Estilo do modal
- Animações
- Tamanhos

### 5. Adicionar Mais Informações no Modal

Edite o tipo `SkillData` e o componente do modal para incluir:
- Links para projetos
- Certificações
- Nível de proficiência
- Data de início
- Etc.

## 🎨 Exemplo de Uso no Portfólio

```tsx
import { SkillsAtom } from '@/components/modulo-3/SkillsAtom'

export default function SkillsSection() {
  return (
    <section id="skills">
      <h2>Minhas Skills</h2>
      <SkillsAtom />
    </section>
  )
}
```

## 🔧 Configurações Avançadas

### Velocidade de Órbita

Ajuste a velocidade de rotação das órbitas:

```typescript
orbitSpeed={0.3} // Mais rápido = número maior
orbitSpeed={-0.2} // Negativo = direção oposta
```

### Raio das Órbitas

Ajuste a distância dos elétrons do núcleo:

```typescript
radius={2.5} // Órbita interna
radius={3.5} // Órbita externa
```

### Tamanho do Núcleo

```typescript
<sphereGeometry args={[0.8, 32, 32]} />
//                          ↑ tamanho
```

## 💡 Dicas

1. **Performance**: Se tiver muitas skills (20+), considere usar menos elétrons ou agrupar skills similares
2. **Cores**: Use cores que representem as tecnologias (ex: React = #61dafb, Node.js = #339933)
3. **Projetos**: Liste projetos reais e relevantes para cada stack
4. **Experiência**: Seja honesto sobre o tempo de experiência em cada tecnologia

## 🐛 Troubleshooting

Se houver erros de tipo do TypeScript:
1. Certifique-se de que todas as dependências estão instaladas: `npm install`
2. Verifique se o `tsconfig.json` está configurado corretamente
3. Alguns erros de tipo podem ser ignorados se o código funcionar no navegador

