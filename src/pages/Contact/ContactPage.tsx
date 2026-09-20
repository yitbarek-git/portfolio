import React, { useState } from 'react';
import { Container } from '../../components/common/Container';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Textarea } from '../../components/common/Textarea';
import { Select } from '../../components/common/Select';
import { Badge } from '../../components/common/Badge';
import { contactService } from '../../services/contactService';
import { profileData } from '../../data/profile';
import { ContactSubmission } from '../../types';
import { useSEO } from '../../hooks/useSEO';
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle, Clock, MapPin } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const projectTypes = [
  { value: 'Senior Frontend Engineering', label: 'Senior Frontend Engineering (React 19 / TypeScript / Next.js)' },
  { value: 'Custom E-Commerce Storefront', label: 'Custom E-Commerce Storefront (Stripe / Cart / 3NF DB)' },
  { value: 'Python Telegram Bot & Automation', label: 'Python Automation (Telegram Bot / AI Workflows / ETL)' },
  { value: 'Full-Stack Web Application', label: 'Full-Stack Web Application (React + Node.js / FastAPI)' },
  { value: 'Technical Mentorship & Code Review', label: 'Developer Mentorship & Architecture Code Review' },
];

const budgetOptions = [
  { value: 'Sprint Milestone ($1,000 – $2,500)', label: 'Sprint Milestone ($1,000 – $2,500)' },
  { value: 'Comprehensive MVP ($2,500 – $6,000)', label: 'Comprehensive MVP ($2,500 – $6,000)' },
  { value: 'Hourly Remote Contract ($35 – $55/hr)', label: 'Hourly Remote Contract ($35 – $55/hr)' },
  { value: 'Code Audit / Architecture Consultation', label: 'Code Audit / Architecture Consultation' },
];

export const ContactPage: React.FC = () => {
  useSEO({
    title: 'Hire Senior Frontend & Full-Stack Engineer — Contact Yitbarek K.',
    description: 'Initiate a remote contract or milestone project: Senior React 19/TypeScript frontend, custom e-commerce, or Python bot automation for international clients and students.',
    keywords: 'Hire Senior Frontend Developer, Remote Contract React Engineer, Upwork Freelancer, Python Bot Developer Contact, Web Development Consultation'
  });

  const { showToast } = useToast();

  const [formData, setFormData] = useState<ContactSubmission>({
    name: '',
    email: '',
    projectType: 'Full-Stack Web App',
    budget: 'Flexible / Standard',
    deadline: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactSubmission, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs: Partial<Record<keyof ContactSubmission, string>> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format';
    }
    if (!formData.message.trim()) {
      errs.message = 'Message content is required';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Please provide a descriptive message (min 15 chars)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please correct the validation errors in the form.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await contactService.submitMessage(formData);
      setIsSuccess(true);
      showToast('Inquiry received. Thank you for reaching out!', 'success');
      setFormData({
        name: '',
        email: '',
        projectType: 'Full-Stack Web App',
        budget: 'Flexible / Standard',
        deadline: '',
        message: '',
      });
    } catch {
      showToast('Failed to submit message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <Container size="xl">
        <SectionHeading
          badgeText="Get In Touch"
          title="Contact & Project Inquiry"
          subtitle="Have a question or a project in mind? Send me a message and I'll get back to you within 24 hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <Card padding="lg" className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-[var(--color-text)] mb-2">
                  Direct Contact
                </h2>
                <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                  I personally read and reply to all client inquiries and messages promptly.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[var(--color-border)] text-xs font-mono">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[var(--color-muted)] block text-[11px]">Email</span>
                    <a
                      href={`mailto:${profileData.socials.email}`}
                      className="text-[var(--color-text)] font-semibold hover:text-[#D4A72C] transition-colors"
                    >
                      {profileData.socials.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[var(--color-muted)] block text-[11px]">Location</span>
                    <span className="text-[var(--color-text)] font-semibold">
                      {profileData.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[var(--color-muted)] block text-[11px]">Current Status</span>
                    <span className="text-[var(--color-text)] font-semibold">
                      {profileData.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profiles */}
              <div className="pt-4 border-t border-[var(--color-border)] space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)] block">
                  Find Me Online:
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={profileData.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] text-xs font-mono text-[var(--color-text)] bg-[var(--color-surface-hover)] border border-[var(--color-border)] hover:border-[#D4A72C] transition-colors"
                  >
                    <Github className="w-4 h-4 text-[#D4A72C]" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={profileData.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] text-xs font-mono text-[var(--color-text)] bg-[var(--color-surface-hover)] border border-[var(--color-border)] hover:border-[#D4A72C] transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#D4A72C]" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </Card>

            {/* International Remote Collaboration Guarantees */}
            <Card padding="md" className="space-y-3 border-l-2 border-l-[#D4A72C]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4A72C] font-bold block">
                🛡️ Client Guarantees:
              </span>
              <ul className="space-y-2 text-xs text-[var(--color-muted)]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <span><strong>Milestone Payments:</strong> Clear milestones with live preview links before any payment is released.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <span><strong>Timezone Overlap:</strong> 4–6 daily hours of active overlap with US and European business hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <span><strong>100% Code Ownership:</strong> You own all source code, plus 30 days of free bug fixes after delivery.</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Card padding="lg" className="space-y-6">
              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-text)]">
                    Inquiry Received Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] max-w-md mx-auto leading-relaxed">
                    Thank you for submitting your project requirements. Your message has been safely logged in the platform queue and will be reviewed shortly.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsSuccess(false)}
                    className="mt-4"
                  >
                    Submit Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      error={errors.name}
                      required
                    />

                    <Input
                      label="Email Address *"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@domain.com"
                      error={errors.email}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Project Domain / Type"
                      options={projectTypes}
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    />

                    <Input
                      label="Estimated Deadline / Target"
                      value={formData.deadline || ''}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      placeholder="e.g. Q3 2026, 4 Weeks"
                    />
                  </div>

                  <Select
                    label="Project Scope / Budget Expectation"
                    options={budgetOptions}
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  />

                  <Textarea
                    label="Project Specification & Message *"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Outline your application requirements, system architecture questions, or technical timeline..."
                    rows={5}
                    error={errors.message}
                    required
                  />

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      isLoading={isSubmitting}
                      rightIcon={<Send className="w-4 h-4" />}
                    >
                      {isSubmitting ? 'Submitting Specifications...' : 'Send Engineering Inquiry'}
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};
