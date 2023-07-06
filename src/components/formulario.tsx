import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import './formulario.css';

// Definición de la interfaz para los valores del formulario
interface FormValues {
  username: string;
  lastname: string;
  age: number;
  phone: number;
  country: string;
  city: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Definición del esquema de validación con Yup
const validationSchema = Yup.object().shape({
  // Validación para el nombre de usuario
  username: Yup.string().required('El nombre de usuario es obligatorio'),
  // Validación para el apellido de usuario
  lastname: Yup.string().required('El apellido de usuario es obligatorio'),
  // Validación para la edad
  age: Yup.number().required('La edad es obligatoria'),
  // Validación para el número de teléfono
  phone: Yup.number().required('El número de teléfono es obligatorio'),
  // Validación para el país
  country: Yup.string().required('El país es obligatorio'),
  // Validación para la ciudad
  city: Yup.string().required('La ciudad es obligatoria'),
  // Validación para el correo electrónico
  email: Yup.string().email('Formato de correo electrónico inválido').required('El correo electrónico es obligatorio'),
  // Validación para la contraseña
  password: Yup.string().required('La contraseña es obligatoria'),
  // Validación para la confirmación de contraseña
  confirmPassword: Yup.string()
    .required('La confirmación de contraseña es obligatoria')
    .test('password-match', 'Las contraseñas deben coincidir', function (value) {
      return this.parent.password === value;
    }),
});

// Valores iniciales para el formulario
const initialValues: FormValues = {
  username: '',
  lastname: '',
  age: 0,
  phone: 3,
  country: '',
  city: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Formulario = () => {
  // Estado para controlar el paso actual del formulario
  const [currentStep, setCurrentStep] = useState(1);
  // Estado para indicar si el formulario ha sido enviado
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Estado para almacenar los datos enviados
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  // Función para avanzar al siguiente paso del formulario
  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Función para retroceder al paso anterior del formulario
  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // Función para manejar la presentación del formulario
  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    console.log(values);
    setSubmittedData(values);
    setIsSubmitted(true);
    setSubmitting(false);
  };

  // Función para manejar el caso de "Enviar de todos modos"
  const handleEnviarDeTodosModos = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setCurrentStep(1);
    window.location.reload();
  };

  // Función para manejar la edición del formulario
  const handleEdit = () => {
    setCurrentStep(1);
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <div className="formulario-container">
      <h2>Crea Una Cuenta!</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            {/* Paso 1: Información personal */}
            {currentStep === 1 && (
              <div>
                <label htmlFor="username">Nombre:</label>
                <Field type="text" id="username" className="foco" name="username" disabled={isSubmitting} />
                <ErrorMessage className="errorm" name="username" component="div" />
                <label htmlFor="lastname">Apellido:</label>
                <Field type="text" id="lastname" className="foco" name="lastname" disabled={isSubmitting} />
                <ErrorMessage className="errorm" name="lastname" component="div" />
                <button className="anterior" type="button" onClick={handleNextStep}>Siguiente</button>
              </div>
            )}

            {/* Paso 2: Información de contacto */}
            {currentStep === 2 && (
              <div>
                <label htmlFor="age">Edad:</label>
                <Field type="number" id="age" className="foco" name="age" inputMode="numeric" disabled={isSubmitting} />
                <ErrorMessage className="errorm" name="age" component="div" />
                <label htmlFor="phone">Teléfono:</label>
                <Field type="number" id="phone" className="foco" name="phone" inputMode="numeric" disabled={isSubmitting} />
                <ErrorMessage className="errorm" name="phone" component="div" />
                <button className="anterior" type="button" onClick={handlePreviousStep}>Anterior</button>
                <button className="anterior" type="button" onClick={handleNextStep}>Siguiente</button>
              </div>
            )}

            {/* Paso 3: Información de ubicación */}
            {currentStep === 3 && (
              <div>
                <label htmlFor="country">País:</label>
                <Field type="text" id="country" className="foco" name="country" disabled={isSubmitting} />
                <ErrorMessage className="errorm" name="country" component="div" />
                <label htmlFor="city">Ciudad:</label>
                <Field type="text" id="city" className="foco" name="city" disabled={isSubmitting} />
                <ErrorMessage className="errorm" name="city" component="div" />
                <button className="anterior" type="button" onClick={handlePreviousStep}>Anterior</button>
                <button className="anterior" type="button" onClick={handleNextStep}>Siguiente</button>
              </div>
            )}

            {/* Paso 4: Información de correo electrónico */}
            {currentStep === 4 && (
              <div>
                <label htmlFor="email">Correo Electrónico:</label>
                <Field type="email" id="email" className="foco" name="email" inputMode="text" disabled={isSubmitting} />
                <ErrorMessage className="errorm" name="email" component="div" />
                <button className="anterior" type="button" onClick={handlePreviousStep}>Anterior</button>
                <button className="anterior" type="button" onClick={handleNextStep}>Siguiente</button>
              </div>
            )}

            {/* Paso 5: Información de contraseña */}
            {currentStep === 5 && (
              <div>
                <label htmlFor="password">Contraseña:</label>
                <Field type="password" id="password" className="foco" name="password" disabled={isSubmitting} />
                <ErrorMessage className="errorm" name="password" component="div" />
                <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                <Field type="password" id="confirmPassword" className="foco" name="confirmPassword" disabled={isSubmitting} />
                <ErrorMessage className="errorm" name="confirmPassword" component="div" />
                <button className="anterior" type="button" onClick={handlePreviousStep}>Anterior</button>
                <button type="submit" disabled={!isValid || isSubmitting}>Guardar</button>
              </div>
            )}
          </Form>
        )}
      </Formik>

      {/* Resumen de los datos enviados */}
      {isSubmitted && (
        <div className="resumen">
          <h3>Confirma!</h3>
          <p className="submitted-data">Nombre:</p>
          <p> {submittedData?.username}</p>
          <p className="submitted-data">Apellido:</p>
          <p>{submittedData?.lastname}</p>
          <p className="submitted-data">Edad:</p>
          <p> {submittedData?.age}</p>
          <p className="submitted-data">Telefono:</p>
          <p>{submittedData?.phone}</p>
          <p className="submitted-data">Pais:</p>
          <p>{submittedData?.country}</p>
          <p className="submitted-data">Ciudad:</p>
          <p>{submittedData?.city}</p>
          <p className="submitted-data">Correo electrónico: </p>
          <p>{submittedData?.email}</p>
          <button type="button" className="morado" onClick={handleEdit}>Editar</button>
          <button type="button" className="azul" onClick={handleEnviarDeTodosModos}>Confirmar</button>
        </div>
      )}
    </div>
  );
};

export default Formulario;

