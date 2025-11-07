# ☁️ Nuvem de Tags 3D - Guia de Personalização

Este componente cria uma visualização 3D interativa das suas skills/tecnologias em formato de nuvem de tags esférica.

## 🎯 Características

- **Distribuição Uniforme**: Tags distribuídas uniformemente na superfície de uma esfera usando algoritmo Fibonacci Sphere
- **Interação Hover**: Mostra tooltip com nome e experiência ao passar o mouse
- **Modal de Detalhes**: Clique para ver experiência completa, projetos e link oficial
- **Rotação Automática**: Rotação suave e contínua (pausa no hover)
- **Controle de Velocidade**: Slider para ajustar velocidade de rotação
- **Rotação Manual**: Arraste com o mouse para rotacionar manualmente
- **Design Moderno**: Fundo escuro com gradiente radial, texto com outline

## 📝 Como Personalizar

### 1. Editar os Dados das Tags

Edite o arquivo `tagsData.ts` com suas skills reais:

```typescript
export const tagsData: TagData[] = [
  {
    id: 'react',                    // ID único
    name: 'React',                  // Nome exibido
    experience: '3 anos',           // Tempo de experiência
    projects: [                     // Lista de projetos
      'E-commerce Platform',
      'Dashboard Admin'
    ],
    color: '#61dafb',              // Cor da tag
    url: 'https://reactjs.org/'     // Link opcional
  },
  // Adicione mais tags...
]
```

### 2. Extrair Dados do CV

Para popular com dados do seu CV:

1. Abra o PDF do seu CV
2. Liste todas as tecnologias/frameworks que você conhece
3. Para cada uma, anote:
   - Tempo de experiência
   - Projetos onde você usou
   - Cor representativa (geralmente a cor oficial da tecnologia)

### 3. Ajustar Cores

Cada tag pode ter uma cor personalizada. Use as cores oficiais das tecnologias:
- React: `#61dafb`
- Next.js: `#000000`
- TypeScript: `#3178c6`
- Node.js: `#339933`
- etc.

### 4. Adicionar Mais Tags

Simplesmente adicione mais objetos ao array `tagsData`. O componente ajusta automaticamente a distribuição na esfera.

### 5. Remover Tags

Remova itens do array `tagsData` para ocultar tecnologias que você não quer exibir.

## 🎨 Personalização Visual

### Cores de Fundo

Edite `TagCloud3D.module.css`:

```css
.canvasWrapper {
  background: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.95) 50%,
    rgba(0, 0, 0, 1) 100%
  );
}
```

### Tamanho da Esfera

No arquivo `TagCloud3D.tsx`, ajuste o raio:

```typescript
position={[
  positions[index][0] * 5,  // Aumente/diminua este valor
  positions[index][1] * 5,
  positions[index][2] * 5
]}
```

### Tamanho do Texto

Ajuste `fontSize` no componente `Tag`:

```typescript
const fontSize = isHovered ? 0.3 : 0.2  // Ajuste estes valores
```

## ⚙️ Configurações Avançadas

### Velocidade de Rotação Padrão

```typescript
const [rotationSpeed, setRotationSpeed] = useState(1)  // 1 = velocidade normal
```

### Distância da Câmera

```typescript
<Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
  // Ajuste position[2] para zoom in/out
```

### Limites de Zoom

```typescript
<OrbitControls
  minDistance={8}   // Zoom mínimo
  maxDistance={15}  // Zoom máximo
/>
```

## 💡 Dicas

1. **Organização**: Organize as tags por categoria (Frontend, Backend, Tools, etc.) se quiser
2. **Quantidade**: Funciona bem com 10-50 tags. Muitas tags podem ficar confuso
3. **Cores**: Use cores contrastantes para melhor legibilidade
4. **Projetos**: Liste projetos reais e relevantes
5. **Experiência**: Seja honesto sobre o tempo de experiência

## 🐛 Troubleshooting

### Tags não aparecem
- Verifique se `tagsData` não está vazio
- Confira se há erros no console do navegador

### Performance lenta
- Reduza a quantidade de tags
- Diminua o `fontSize`
- Ajuste a qualidade do `outlineWidth`

### Texto ilegível
- Aumente o `outlineWidth` para melhor contraste
- Use cores mais claras
- Aumente o `fontSize`

## 📚 Recursos

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Docs](https://threejs.org/docs/)
- [Drei Components](https://github.com/pmndrs/drei)

