import { useForm } from "react-hook-form";


export const App = () => {

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    defaultValues: {
      nombre: 'Juan',
      correo: 'juan@gmail.com',
    }
  });

  const onSubmit = handleSubmit((data) => {

  })

  return (

    <form onSubmit={onSubmit}>

      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        {...register('nombre', {
          required: {
            value: true,
            message: 'Nombre es requerido'
          },
          minLength: {
            value: 2,
            message: 'Nombre debe tener al menos 2 caracteres'
          },
          maxLength: {
            value: 20,
            message: 'Nombre debe tener maximo 20 caracteres'
          }
        })} />
      {
        errors.nombre && <span>{errors.nombre.message}</span>
      }


      <label htmlFor="correo">Correo</label>
      <input
        type="email"
        {...register('correo', {
          required: {
            value: true,
            message: 'Correo es requerido'
          },
          pattern: {
            value: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
            message: 'Correo no valido'
          }
        })} />
      {
        errors.correo && <span>{errors.correo.message}</span>
      }

      <label htmlFor="password">Password</label>
      <input
        type="password"
        {...register('password', {
          required: {
            value: true,
            message: 'Password es requerido'
          },
          minLength: {
            value: 5,
            message: 'Password debe tener al menos 5 caracteres'
          },
          maxLength: {
            value: 20,
            message: 'Nombre debe tener maximo 20 caracteres'
          }
        })} />
      {
        errors.password && <span>{errors.password.message}</span>
      }

      <label htmlFor="confirmarPassword">Confirmar Password</label>
      <input
        type="password"
        {...register('confirmarPassword', {
          required: {
            value: true,
            message: 'Password es requerido'
          },
          validate: value => value === watch('password') || 'Los password no coinciden'
        })} />
      {
        errors.confirmarPassword && <span>{errors.confirmarPassword.message}</span>
      }

      <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
      <input
        type="date"
        {...register('fechaNacimiento', {
          required: {
            value: true,
            message: 'Fecha de Nacimiento es requerida'
          },
          validate: (value) => {
            const fechaNacimiento = new Date(value)
            const fechaActual = new Date()
            const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear()

            return edad >= 18 || 'Debes ser mayor de edad'
          }
        })} />
      {
        errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>
      }

      <label htmlFor="pais">Pais</label>
      <select {...register('pais')}>
        <option value="mx">Mexico</option>
        <option value="ar">Argentina</option>
        <option value="co">Colombia</option>
      </select>
      {
        watch('pais') == 'ar' && (
          <>
            <input
              type="text"
              placeholder="Provincia"
              {...register('provincia', {
                required: {
                  value: true,
                  message: 'Provincia es requerida'
                }
              })} />
            {
              errors.provincia && <span>{errors.provincia.message}</span>
            }
          </>
        )
      }

      <label htmlFor="foto">File</label>
      <input type="file" onChange={(e) => {
        setValue('fotoDelUsuario', e.target.files[0].name)
      }} />

      <label htmlFor="terminos">Terminos y condiciones</label>
      <input
        type="checkbox"
        {...register('terminos', {
          required: {
            value: true,
            message: 'Debe aceptar terminos y condiciones'
          }
        })} />
      {
        errors.terminos && <span>{errors.terminos.message}</span>
      }


      <button type="submit">Enviar</button>

      <pre>
        {JSON.stringify(watch(), null, 2)}
      </pre>
    </form>
  )
}


