import { Person } from './interfaces/person';
import { ToastContainer } from 'react-toastify';
import Form from './components/Form';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const handleSubmit = (formData: Person) => {
    console.log(JSON.stringify(formData));
  };

  return (
    <div>
      <ToastContainer closeButton={true} />
      <Form onSubmit={handleSubmit} />
    </div>
  );
};

export default App;