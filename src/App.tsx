import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CapturaPage } from './pages/CapturaPage';
import { QuizPage } from './pages/QuizPage';
import { ResultadoPage } from './pages/ResultadoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LP de Captura - Pagina inicial */}
        <Route path="/" element={<CapturaPage />} />

        {/* Quiz - Apos captura do email */}
        <Route path="/quiz" element={<QuizPage />} />

        {/* Resultado - Perfil + CTA do evento */}
        <Route path="/resultado" element={<ResultadoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
