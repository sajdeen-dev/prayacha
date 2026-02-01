import React, { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'prayacha_waitlist'

interface ContactModalProps {
    isOpen: boolean
    onClose: () => void
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsappNumber: '',
        areaInBangalore: '',
        deviceType: '',
        interestedInBeta: false
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastType, setToastType] = useState<'success' | 'error'>('success')
    const [emailError, setEmailError] = useState('')

    const checkEmailExists = useCallback((email: string): boolean => {
        if (!email) {
            setEmailError('')
            return false
        }

        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            const entries: { email: string }[] = stored ? JSON.parse(stored) : []
            const normalizedEmail = email.toLowerCase().trim()
            const exists = entries.some((e) => e.email === normalizedEmail)
            setEmailError(exists ? 'Email already exists' : '')
            return exists
        } catch {
            setEmailError('')
            return false
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        
        
        if (name === 'whatsappNumber') {
            const numericValue = value.replace(/\D/g, '').slice(0, 10)
            setFormData({
                ...formData,
                [name]: numericValue
            })
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
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
                if (toastType === 'success') {
                    setTimeout(() => {
                        onClose()
                    }, 300)
                }
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [showToast, toastType, onClose])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (checkEmailExists(formData.email)) {
            showToastMessage('Email already exists', 'error')
            return
        }

        setIsSubmitting(true)

        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            const entries = stored ? JSON.parse(stored) : []
            entries.push({
                name: formData.name,
                email: formData.email.toLowerCase().trim(),
                whatsappNumber: formData.whatsappNumber,
                areaInBangalore: formData.areaInBangalore,
                deviceType: formData.deviceType,
                interestedInBeta: formData.interestedInBeta,
                submittedAt: new Date().toISOString()
            })
            localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))

            setFormData({
                name: '',
                email: '',
                whatsappNumber: '',
                areaInBangalore: '',
                deviceType: '',
                interestedInBeta: false
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

    if (!isOpen) return null

    return (
        <>
            {showToast && (
                <div
                    className={`fixed top-4 right-4 z-[60] px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-slide-in ${
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

            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
                style={{
                    background: 'rgba(0, 0, 0, 0.3)'
                }}
                onClick={onClose}
            >
            <div
                className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 relative my-auto"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 sm:top-6 sm:right-6 md:top-8 md:right-8 z-10 w-5 h-5 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-gray-600 hover:text-gray-800"
                    aria-label="Close modal"
                >
                    <svg 
                        className="w-5 h-5 sm:w-6 sm:h-6" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M6 18L18 6M6 6l12 12" 
                        />
                    </svg>
                </button>

                <h1 className="text-center text-[#000000] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-light leading-relaxed mb-6 sm:mb-10 md:mb-12 lg:mb-16 px-2 sm:px-4 font-poppins">
                    Get connected with our team of specialists who are here to guide you, support you, and help you make confident decisions every step of the way
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
                                Email Address
                            <p className="text-[12px] sm:text-[13px] text-gray-600 mb-2 font-poppins">
                                associated with your Apple App Store or Google Play Store account
                            </p>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your App Store or Play Store email"
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

                        <div>
                            <label className="block text-black text-[14px] sm:text-[16px] md:text-[18px] font-light mb-1.5 sm:mb-2 font-poppins">
                                WhatsApp Number
                            </label>
                            <input
                                type="tel"
                                name="whatsappNumber"
                                value={formData.whatsappNumber}
                                onChange={handleChange}
                                placeholder="Enter 10 digit WhatsApp number"
                                maxLength={10}
                                pattern="[0-9]{10}"
                                className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 bg-[#D9D9D933] rounded-md text-sm sm:text-base text-[#000000] placeholder-[#00000066] focus:outline-none font-poppins"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-black text-[14px] sm:text-[16px] md:text-[18px] font-light mb-1.5 sm:mb-2 font-poppins">
                                    Which area do you live in Bangalore?
                            </label>
                            <input
                                type="text"
                                name="areaInBangalore"
                                value={formData.areaInBangalore}
                                onChange={handleChange}
                                placeholder="Enter your area in Bangalore"
                                className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 bg-[#D9D9D933] rounded-md text-sm sm:text-base text-[#000000] placeholder-[#00000066] focus:outline-none font-poppins"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-black text-[14px] sm:text-[16px] md:text-[18px] font-light mb-1.5 sm:mb-2 font-poppins">
                                Device Type
                            </label>
                            <select
                                name="deviceType"
                                value={formData.deviceType}
                                onChange={handleChange}
                                className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 bg-[#D9D9D933] rounded-md text-sm sm:text-base text-[#000000]  focus:outline-none font-poppins"
                                required
                            >
                                <option value="">Select device type</option>
                                <option value="android">Android</option>
                                <option value="iPhone">iPhone</option>
                            </select>
                        </div>

                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                name="interestedInBeta"
                                id="interestedInBeta"
                                checked={formData.interestedInBeta}
                                onChange={handleChange}
                                className="mt-1 mr-2 w-4 h-4 text-[#1E1EAF] bg-[#D9D9D933] border-gray-300 rounded focus:ring-[#1E1EAF]"
                            />
                            <label htmlFor="interestedInBeta" className="text-black text-[14px] sm:text-[16px] md:text-[18px] font-light font-poppins cursor-pointer">
                                Are you interested in Apply for Early Beta Access to test the App
                            </label>
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
            </div>
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
        </>
    )
}

export default ContactModal