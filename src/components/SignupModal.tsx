'use client';

import React from 'react';
import { useState } from 'react';
import { Upload, CheckCircle, X } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  skills: string;
  cv: File | null;
  acceptTerms: boolean;
}

interface SubmissionState {
  submitted: boolean;
  data: FormData | null;
}

type FormErrors = {
  [K in keyof FormData]?: boolean;
};

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    skills: '',
    cv: null,
    acceptTerms: false,
  });

  const [submission, setSubmission] = useState<SubmissionState>({
    submitted: false,
    data: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = true;
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = true;
    if (!formData.phone.trim()) newErrors.phone = true;
    if (!formData.experience.trim()) newErrors.experience = true;
    if (!formData.skills.trim()) newErrors.skills = true;
    if (!formData.cv) newErrors.cv = true;
    if (!formData.acceptTerms) newErrors.acceptTerms = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        setErrors({ ...errors, cv: true });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, cv: true });
        return;
      }
      setFormData({ ...formData, cv: file });
      setErrors({ ...errors, cv: false });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const submissionData = {
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('gameSubmissions') || '[]');
      localStorage.setItem('gameSubmissions', JSON.stringify([...existing, submissionData]));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    setSubmission({
      submitted: true,
      data: formData,
    });

    setIsLoading(false);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      experience: '',
      skills: '',
      cv: null,
      acceptTerms: false,
    });
    setSubmission({
      submitted: false,
      data: null,
    });
    setErrors({});
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-lg"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {submission.submitted && submission.data ? (
          // Success View
          <div className="bg-gradient-to-b from-cyan-100 via-cyan-50 to-white p-8 md:p-12">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-green-100 rounded-full p-4">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Application Submitted Successfully!
              </h1>

              <p className="text-gray-700 text-lg mb-8">
                Welcome to The Developer Games, {submission.data.fullName}!
              </p>

              <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left border border-blue-200">
                <h2 className="font-bold text-gray-900 mb-4">Submission Details:</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Full Name:</span>
                    <span className="font-semibold text-gray-900">{submission.data.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Email:</span>
                    <span className="font-semibold text-gray-900">{submission.data.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Experience Level:</span>
                    <span className="font-semibold text-gray-900">{submission.data.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">CV Uploaded:</span>
                    <span className="font-semibold text-gray-900">{submission.data.cv?.name}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-8">
                We've received your application and will review your qualifications. You'll receive an email confirmation shortly at <span className="font-semibold">{submission.data.email}</span> with next steps for The Developer Games.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleClose}
                  className="px-8 py-3 rounded-md bg-[#074A4F] text-white font-bold hover:opacity-90 transition-all text-center"
                >
                  Close
                </button>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded-md border border-[#074A4F] text-[#074A4F] font-bold hover:bg-[#074A4F]/10 transition-all"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Form View
          <div className="bg-gradient-to-b from-cyan-100 via-cyan-50 to-white p-8 md:p-12">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-[#074A4F] mb-2">
                Join The Developer Games
              </h1>
              <p className="text-gray-700 text-lg">
                Fill out the form below to compete for elite placements at top-tier global companies.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                    errors.fullName
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-blue-200 focus:border-[#074A4F]'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-600 text-sm mt-1">Full name is required</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                    errors.email
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-blue-200 focus:border-[#074A4F]'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">Valid email is required</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                    errors.phone
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-blue-200 focus:border-[#074A4F]'
                  }`}
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">Phone number is required</p>
                )}
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Experience Level *
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                    errors.experience
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-blue-200 focus:border-[#074A4F]'
                  }`}
                >
                  <option value="">Select your experience level</option>
                  <option value="Beginner">Beginner (0-1 years)</option>
                  <option value="Intermediate">Intermediate (1-3 years)</option>
                  <option value="Advanced">Advanced (3-5 years)</option>
                  <option value="Expert">Expert (5+ years)</option>
                </select>
                {errors.experience && (
                  <p className="text-red-600 text-sm mt-1">Experience level is required</p>
                )}
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Technical Skills *
                </label>
                <textarea
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none resize-none ${
                    errors.skills
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-blue-200 focus:border-[#074A4F]'
                  }`}
                  placeholder="List your technical skills (e.g., JavaScript, React, Python, etc.)"
                  rows={4}
                />
                {errors.skills && (
                  <p className="text-red-600 text-sm mt-1">Technical skills are required</p>
                )}
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Upload CV/Resume *
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    errors.cv
                      ? 'border-red-500 bg-red-50'
                      : 'border-blue-300 bg-blue-50 hover:border-[#074A4F]'
                  }`}
                >
                  <input
                    type="file"
                    id="cv-upload-modal"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="cv-upload-modal" className="cursor-pointer block">
                    <Upload className="w-8 h-8 text-[#074A4F] mx-auto mb-2" />
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      {formData.cv ? formData.cv.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-600">
                      PDF, DOC, or DOCX (Max 5MB)
                    </p>
                  </label>
                </div>
                {errors.cv && (
                  <p className="text-red-600 text-sm mt-1">
                    Please upload a valid CV (PDF, DOC, or DOCX, max 5MB)
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms-modal"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="w-5 h-5 mt-1 rounded border-2 border-blue-300 text-[#074A4F] focus:ring-2 focus:ring-[#074A4F] cursor-pointer"
                />
                <label htmlFor="terms-modal" className="text-sm text-gray-700">
                  I agree to the{' '}
                  <span className="font-semibold text-[#074A4F]">Terms and Conditions</span> of The
                  Developer Games and consent to receive updates about the competition.
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="text-red-600 text-sm mt-1">You must accept the terms and conditions</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-8 py-4 rounded-lg bg-[#074A4F] text-white font-bold text-lg hover:opacity-90 disabled:opacity-50 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              By submitting this form, you agree to participate in The Developer Games competitions and evaluation process.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}