'use client';
import React from 'react'
import { useState } from 'react'
import { Upload, CheckCircle } from 'lucide-react'

type FormData = {
  fullName: string
  email: string
  phone: string
  experience: string
  skills: string
  cv: File | null
  acceptTerms: boolean
}

type PasswordHints = {
  [K in keyof FormData]?: boolean
}

type SignupFormProps = {
  onSubmit?: () => void
}

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    skills: '',
    cv: null,
    acceptTerms: false,
  })
  const [errors, setErrors] = useState<PasswordHints>({})
  const [submitted, setSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState<FormData | null>(null)
  const [loading, setLoading] = useState(false)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) {
      setFormData({ ...formData, cv: f })
    }
  }

  const validate = (): boolean => {
    const errs: PasswordHints = {}
    if (!formData.fullName.trim()) errs.fullName = true
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = true
    if (!formData.phone.trim()) errs.phone = true
    if (!formData.experience.trim()) errs.experience = true
    if (!formData.skills.trim()) errs.skills = true
    if (!formData.cv) errs.cv = true
    if (!formData.acceptTerms) errs.acceptTerms = true
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise(res => setTimeout(res, 1000))
    setSubmittedData(formData)
    setSubmitted(true)
    setLoading(false)
    onSubmit?.()
  }

  if (submitted && submittedData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-100 via-cyan-50 to-white">
        <div className="max-w-2xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="mb-4 inline-flex items-center justify-center bg-green-100 rounded-full w-12 h-12 mx-auto"><CheckCircle className="w-6 h-6 text-green-600"/></div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Application Submitted</h2>
          <p className="text-gray-700">Thanks, {submittedData.fullName}. We’ll be in touch soon.</p>
        </div>
      </div>
    )
  }

  return (
    <section className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-800">Full Name</label>
            <input className="w-full border rounded px-3 py-2" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
            {errors.fullName && <span className="text-red-600 text-xs">Required</span>}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-800">Email</label>
            <input className="w-full border rounded px-3 py-2" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            {errors.email && <span className="text-red-600 text-xs">Invalid</span>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-800">Phone</label>
            <input className="w-full border rounded px-3 py-2" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
            {errors.phone && <span className="text-red-600 text-xs">Required</span>}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-800">Experience</label>
            <input className="w-full border rounded px-3 py-2 text-gray-900" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-800">Skills</label>
          <textarea className="w-full border rounded px-3 py-2 text-gray-900" value={formData.skills} onChange={e => setFormData({ ...formData, skills: e.target.value })} rows={3} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-800">Upload CV/Resume</label>
          <input type="file" onChange={onFileChange} className="border rounded px-3 py-1 text-sm" />
        </div>
        <div className="flex items-center">
          <input type="checkbox" checked={formData.acceptTerms} onChange={e => setFormData({ ...formData, acceptTerms: e.target.checked })} />
          <span className="ml-2 text-sm text-gray-800">I agree to the terms</span>
        </div>
        <button className="w-full py-2 rounded bg-teal-700 text-white font-bold" type="submit">{loading ? 'Submitting...' : 'Submit Application'}</button>
      </form>
    </section>
  )
}
