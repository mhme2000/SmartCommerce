import React from 'react';
import { Smartphone, Phone, Mail, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Smartphone className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">TechShop</h3>
            </div>
            <p className="text-slate-300 text-sm">
              Sua loja de tecnologia com os melhores smartphones do mercado.
            </p>
          </div>

          
          <div>
            <h4 className="font-semibold mb-4">Atendimento</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                (11) 1234-5678
              </p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                contato@techshop.com
              </p>
              <p className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Seg-Sex: 8h às 18h
              </p>
            </div>
          </div>

          
          <div>
            <h4 className="font-semibold mb-4">Links Úteis</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <a href="#" className="block hover:text-white transition-colors">
                Sobre Nós
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                FAQ
              </a>
            </div>
          </div>

          
          <div>
            <h4 className="font-semibold mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-300 text-sm">
          <p>&copy; 2024 TechShop. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
