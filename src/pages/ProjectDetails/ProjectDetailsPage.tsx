import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container } from '../../components/common/Container';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Image } from '../../components/common/Image';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import { projectsService } from '../../services/projectsService';
import { Project } from '../../types';
import { useSEO } from '../../hooks/useSEO';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Cpu,
  Layers,
  Calendar,
  Share2
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const ProjectDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useSEO({
    title: project ? `${project.title} — System Architecture Case Study` : 'Project Details',
    description: project ? project.summary : 'Detailed system architecture case study by Ethiopian software engineer Yitbarek K.',
    keywords: project ? `${project.title}, ${project.technologies.map(t => t.name).join(', ')}, Software Architecture Ethiopia` : undefined,
    ogImage: project?.imageUrl
  });

  const fetchProjectData = async () => {
    if (!slug) return;
    setIsLoading(true);
    setHasError(false);
    try {
      const data = await projectsService.getBySlug(slug);
      if (!data) {
        setProject(null);
      } else {
        setProject(data);
        const related = await projectsService.getRelated(data.slug, data.category);
        setRelatedProjects(related);
      }
    } catch (err) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectData();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Project link copied to clipboard', 'success');
      }
    } catch {
      showToast('Failed to copy link', 'error');
    }
  };

  if (isLoading) {
    return (
      <Container size="lg" className="py-24">
        <LoadingState message="Loading system architecture specification..." />
      </Container>
    );
  }

  if (hasError || !project) {
    return (
      <Container size="lg" className="py-24">
        <ErrorState
          title="Project Not Found"
          message={`The requested technical project "${slug}" could not be located.`}
          onRetry={() => navigate('/projects')}
        />
      </Container>
    );
  }

  return (
    <div className="py-10 sm:py-16 space-y-16">
      <Container size="xl">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-muted)] hover:text-[#D4A72C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects Catalog
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-mono text-[var(--color-muted)] hover:text-[var(--color-text)] bg-[var(--color-surface)] border border-[var(--color-border)] transition-colors"
              title="Share Project"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Project Header */}
        <div className="mt-8 space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="gold" size="md">
              {project.category}
            </Badge>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--color-surface)] text-[var(--color-muted)] border border-[var(--color-border)]">
              Status: {project.status}
            </span>
            <span className="text-xs font-mono text-[var(--color-muted)] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {project.createdDate}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-text)] tracking-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
            {project.tagline}
          </p>

          {/* Links / Action bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.links.map((link, idx) => (
              <a key={idx} href={link.url} target="_blank" rel="noreferrer">
                <Button
                  variant={link.type === 'github' ? 'primary' : 'secondary'}
                  size="md"
                  leftIcon={link.type === 'github' ? <Github className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                >
                  {link.label}
                </Button>
              </a>
            ))}
          </div>
        </div>

        {/* Primary Preview Image */}
        <div className="my-10">
          <Image
            asset={project.images[0]}
            aspectRatio="wide"
            showTemporaryBadge
            className="w-full max-h-[520px] object-cover"
          />
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Problem, Solution, Features */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A72C]" />
                Project Specification & Scope
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-[var(--radius-lg)] border border-red-500/30 bg-red-500/5 space-y-3">
                <div className="flex items-center gap-2 text-red-500 font-bold text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>The Engineering Problem</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-6 rounded-[var(--radius-lg)] border border-emerald-500/30 bg-emerald-500/5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>The Architectural Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Core Features */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A72C]" />
                Key Technical Capabilities
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[var(--color-text)] font-medium">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Images Gallery */}
            {project.images.length > 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4A72C]" />
                  System Visuals & Telemetry
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.images.slice(1).map((img, idx) => (
                    <Image key={idx} asset={img} aspectRatio="video" showTemporaryBadge />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Stack & Metadata Card */}
          <div className="lg:col-span-4 space-y-6">
            <Card padding="md" className="space-y-6 sticky top-24">
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)] mb-3 pb-2 border-b border-[var(--color-border)]">
                  Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-[var(--radius-sm)] text-xs font-mono bg-[var(--color-surface-hover)] text-[var(--color-text)] border border-[var(--color-border)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {project.architectureOverview && (
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)] mb-2 pb-2 border-b border-[var(--color-border)]">
                    Architecture Pattern
                  </h3>
                  <p className="text-xs font-mono text-[var(--color-muted)] leading-relaxed">
                    {project.architectureOverview}
                  </p>
                </div>
              )}

              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)] mb-2 pb-2 border-b border-[var(--color-border)]">
                  Project Inquiries
                </h3>
                <p className="text-xs text-[var(--color-muted)] mb-3">
                  Have questions about this architecture or want to implement a similar solution?
                </p>
                <Link to="/contact">
                  <Button variant="outline" size="sm" className="w-full">
                    Contact Yitbarek
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="pt-16 border-t border-[var(--color-border)] space-y-6">
            <h3 className="text-xl font-bold text-[var(--color-text)]">
              Related Engineering Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((rel) => (
                <Card key={rel.id} hoverEffect className="flex flex-col justify-between space-y-4">
                  <div>
                    <Badge variant="gold" size="sm">{rel.category}</Badge>
                    <h4 className="text-base font-bold text-[var(--color-text)] mt-2">
                      <Link to={`/projects/${rel.slug}`}>{rel.title}</Link>
                    </h4>
                    <p className="text-xs text-[var(--color-muted)] mt-1 line-clamp-2">
                      {rel.tagline}
                    </p>
                  </div>
                  <Link
                    to={`/projects/${rel.slug}`}
                    className="text-xs font-semibold text-[#D4A72C] flex items-center gap-1"
                  >
                    View Project <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
