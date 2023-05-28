import { useStylesScoped$ } from '@builder.io/qwik';
import styles from "./card.css?inline"

import { component$ } from '@builder.io/qwik';

interface Props { 
  colors: string[],
  sizes: string[] | number[]
  backgroundColor ? : string
}

export default component$(({ colors, sizes, backgroundColor = 'transparent' } : Props) => {
  useStylesScoped$(styles);

  return (
      <div class="card" style={{backgroundColor: backgroundColor}}>
        <div class="imgContainer">
        <img
          src='https://static.nike.com/a/images/t_default/851c011e-1c42-4c44-87b8-d14af5c95ff1/pegasus-39-road-running-shoes-sKxqrV.png'
            alt="Nike Shoes"
          />
        </div>
        <div class="content">
          <h2>Nike Air</h2>
          <div class="size">
          <h3>Size:</h3>
          <div class={ 'container-sizes'}>
            {sizes.map((size) => (
              <span  key={ size }>{ size}</span>
            )) }
          </div>
          </div>
          <div class="colors">
            <h3>Color:</h3>
          {colors.map((color) => (
            <span key={color} style={{ backgroundColor: color }}></span>
            )) }
          </div>
          <a href="">Buy Now</a>
        </div>
      </div>
  )
  
});