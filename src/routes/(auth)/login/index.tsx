import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';
import { Form, routeAction$, zod$, z } from '@builder.io/qwik-city';

export const useLoginUserAction = routeAction$((data, {cookie, redirect}) => { 
  const { email, password } = data

  if (email === 'fragilgon@gmail.com' && password === '1234') {
    cookie.set('jwt', 'JSON WEB TOKEN', { secure: true, path: '/' })
    redirect(302, '/')
    return {
      jwt: 'JSON WEB TOKEN',
      success: true,
    }
  }
  return {
    success: false,
  }
  
  
}, zod$({
  email: z.string().email('Formato de email incorrecto'),
  password : z.string().min(4, 'Minimo 4 caracteres'),
}))

export default component$(() => {

  useStylesScoped$(styles);

  const action = useLoginUserAction();
  

    return (
        <Form action = {action} class="login-form mt-5" >
            <div class="relative">
          <input name="email" type="text" placeholder="Email address" />
          <label for="email">Email Address</label>
          { action.value?.fieldErrors?.email && <p class={'not-valid'}>{action.value?.fieldErrors?.email}</p> }
            </div>
            <div class="relative">
          <input  name = 'password' type="password" placeholder="Password" />
          <label for="password">Password</label>
          { action.value?.fieldErrors?.password && <p class={'not-valid'}>{action.value?.fieldErrors?.password}</p> }
          
            </div>
            <div class="relative">
                <button  type='submit'>Ingresar</button>
        </div>
        
        <p>
          {action.value?.success && (
            <code>Autenticado con token : {action.value?.jwt }</code>
          )}
        </p>
        <p>{JSON.stringify(action.value?.fieldErrors?.email)}</p>
        <p>
          Para autentificarse, utilizar los siguientes credenciales : fragilgon@gmail.com 1234
        </p>
        <p>Esto generará una cookie, que se guardará en el navegador</p>
        <p>Para probar que son rutas protegidas, borrar la cookie</p>


            <code>
                { JSON.stringify( {status :action.value, success :action.value?.success, jwt : action.value?.jwt}, undefined , 2 ) }
            </code>  
        </Form>
    )
});