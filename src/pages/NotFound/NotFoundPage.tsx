import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/common/Container';
import { Button } from '../../components/common/Button';
import { Terminal, ArrowLeft, Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16">
      <Container size="sm" className="text-center space-y-6">
        <div className="w-16 h-16 rounded-[var(--radius-xl)] bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C] mx-auto">
          <Terminal className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-[#D4A72C] font-bold tracking-widest uppercase">
            HTTP 404 • Resource Not Found
          </span>
          <h1 className="text-3xl font-extrabold text-[var(--color-text)]">
            Endpoint Does Not Exist
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] max-w-sm mx-auto leading-relaxed">
            The requested URI or resource is not registered in the routing system. Check the URL path or navigate back to the main engineering sections.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link to="/">
            <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
              Return to Homepage
            </Button>
          </Link>
          <Link to="/projects">
            <Button variant="secondary" size="md">
              Browse Projects
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};
