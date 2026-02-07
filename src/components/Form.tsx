import React, { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'swapdotsWaitlist'

const getStoredEntries = (): Array<{ email: string }> => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

const saveEntry = (entry: object) => {
    const entries = getStoredEntries()
    entries.push(entry as { email: string })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastType, setToastType] = useState<'success' | 'error'>('success')
    const [emailError, setEmailError] = useState('')
    const [isCheckingEmail, setIsCheckingEmail] = useState(false)

    const checkEmailExists = useCallback(async (email: string) => {
        if (!email) {
            setEmailError('')
            return false
        }

        setIsCheckingEmail(true)
        try {
            const normalized = email.toLowerCase().trim()
            const entries = getStoredEntries()
            const exists = entries.some((e) => e.email === normalized)
            if (exists) {
                setEmailError('Email already exists')
            } else {
                setEmailError('')
            }
            return exists
        } catch (error) {
            console.error('Error checking email:', error)
            setEmailError('')
            return false
        } finally {
            setIsCheckingEmail(false)
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        
        if (name === 'mobileNumber') {
            const numericValue = value.replace(/\D/g, '').slice(0, 13)
            setFormData({
                ...formData,
                [name]: numericValue
            })
        } else {
            setFormData({
                ...formData,
                [name]: value
            })
        }

        if (name === 'email') {
            setEmailError('')
        }
    }

    useEffect(() => {
        if (!formData.email) {
            setEmailError('')
            return
        }

        const timeoutId = setTimeout(() => {
            checkEmailExists(formData.email)
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [formData.email, checkEmailExists])

    const showToastMessage = (message: string, type: 'success' | 'error') => {
        setToastMessage(message)
        setToastType(type)
        setShowToast(true)
    }

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [showToast])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        const emailExists = await checkEmailExists(formData.email)
        if (emailExists) {
            showToastMessage('Email already exists', 'error')
            return
        }

        setIsSubmitting(true)

        try {
            const entry = {
                name: formData.name,
                email: formData.email.toLowerCase().trim(),
                mobileNumber: formData.mobileNumber,
                submittedAt: new Date().toISOString()
            }
            saveEntry(entry)

            setFormData({
                name: '',
                email: '',
                mobileNumber: ''
            })
            setEmailError('')
            
            showToastMessage('Form submitted successfully!', 'success')
        } catch (error) {
            console.error('Error submitting form:', error)
            showToastMessage('Error submitting form. Please try again.', 'error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12 mb-24">
            {showToast && (
                <div
                    className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 ${
                        toastType === 'success'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                    }`}
                    style={{
                        animation: 'slideInRight 0.3s ease-out',
                        minWidth: '300px',
                        maxWidth: '90vw'
                    }}
                >
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                        toastType === 'success' ? 'bg-white/20' : 'bg-white/20'
                    }`}>
                        {toastType === 'success' ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </div>
                    <p className="text-[14px] sm:text-[15px] font-poppins font-medium flex-1">
                        {toastMessage}
                    </p>
                    <button
                        onClick={() => setShowToast(false)}
                        className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            <h1 className="text-center text-[#000000] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[40px] font-semibold leading-relaxed mb-6 sm:mb-10 md:mb-12 lg:mb-2 px-2 sm:px-4 font-poppins">
                Connect with us?
            </h1>
            <h1 className="text-center text-[#000000] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-light leading-relaxed mb-6 sm:mb-10 md:mb-12 lg:mb-16 px-2 sm:px-4 font-poppins">
                Get connected with our team of specialists who are here to guide you, support you,
                <br />
                and help you make confident decisions every step of the way
            </h1>

            <div className="bg-white border border-[#000000]/30 rounded-2xl sm:rounded-[30px] p-4 sm:p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 md:space-y-8">
                    <div>
                        <label className="block text-black text-[14px] sm:text-[16px] md:text-[18px] font-light mb-1.5 sm:mb-2 font-poppins">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 bg-[#D9D9D933] rounded-md text-sm sm:text-base text-[#000000] placeholder-[#00000066] focus:outline-none font-poppins"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-black text-[14px] sm:text-[16px] md:text-[18px] font-light mb-1.5 sm:mb-2 font-poppins">
                            Mobile Number
                        </label>
                        <input
                            type="tel"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            placeholder="Enter your mobile number with country code"
                            maxLength={12}
                            className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 bg-[#D9D9D933] rounded-md text-sm sm:text-base text-[#000000] placeholder-[#00000066] focus:outline-none font-poppins"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-black text-[14px] sm:text-[16px] md:text-[18px] font-light mb-1.5 sm:mb-2 font-poppins">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            className={`w-full px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 bg-[#D9D9D933] rounded-md text-sm sm:text-base text-[#000000] placeholder-[#00000066] focus:outline-none font-poppins ${
                                emailError ? 'border-2 border-red-500' : ''
                            }`}
                            required
                        />
                        {emailError && (
                            <p className="text-red-600 text-[12px] sm:text-[13px] mt-1.5 font-poppins flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {emailError}
                            </p>
                        )}
                    </div>

                    

                    <div className="flex justify-center pt-4 sm:pt-5 md:pt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="text-white px-8 sm:px-12 md:px-16 py-3 sm:py-3.5 md:py-4 rounded-full border-none text-[14px] sm:text-[15px] md:text-[16px] cursor-pointer inline-flex items-center gap-2 sm:gap-2.5 font-poppins w-full sm:w-auto max-w-[280px] sm:max-w-none justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                background: 'linear-gradient(to right, #1E1EAF, #4040E7)'
                            }}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Form'}
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    )
}

export default ContactForm