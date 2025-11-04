import React, { useState } from 'react';
import { Fingerprint, Heart, Sparkles, Shield, CheckCircle, ArrowRight, Upload, MapPin, DollarSign, Info, X, ChevronRight, ChevronLeft } from 'lucide-react';

export default function PlanaLanding() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(1);
  
  // Health data form state
  const [healthData, setHealthData] = useState({
    age: '',
    weight: '',
    height: '',
    bloodPressure: 'normal',
    smoker: 'no',
    migraines: 'no',
    bloodClots: 'no',
    diabetes: 'no',
    concerns: []
  });
  
  const [insuranceFile, setInsuranceFile] = useState(null);
  const [idFile, setIdFile] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const concerns = [
    'Acne management',
    'Period regulation',
    'Cramp relief',
    'Hormone balance',
    'Convenience',
    'Long-term protection'
  ];

  const recommendations = [
    {
      name: 'Combination Pill (Yaz)',
      type: 'Oral Contraceptive',
      effectiveness: '99% with perfect use',
      cost: '$15-25/month',
      whyItFits: [
        'Perfect for hormone balance and acne management based on your concerns',
        'No contraindications with your health profile',
        'Daily routine fits well with your lifestyle preferences',
        'Helps with period regulation you mentioned'
      ],
      sideEffects: 'Mild nausea initially, breast tenderness',
      clinic: 'Planned Parenthood - Downtown Center',
      address: '123 Main St, Your City, ST 12345',
      distance: '2.3 miles away'
    },
    {
      name: 'Hormonal IUD (Mirena)',
      type: 'Intrauterine Device',
      effectiveness: '99.8% effective',
      cost: '$0-1,300 (often covered by insurance)',
      whyItFits: [
        'Long-term protection matches your convenience preference',
        'Excellent for cramp relief - periods often become lighter or stop',
        'Set it and forget it for 5-8 years',
        'No daily routine required'
      ],
      sideEffects: 'Irregular bleeding first 3-6 months, insertion discomfort',
      clinic: 'Women\'s Health Clinic',
      address: '456 Oak Ave, Your City, ST 12345',
      distance: '3.7 miles away'
    },
    {
      name: 'NuvaRing',
      type: 'Vaginal Ring',
      effectiveness: '99% with perfect use',
      cost: '$0-200/month (usually covered)',
      whyItFits: [
        'Monthly change aligns with your preference for low maintenance',
        'Steady hormone levels help with period regulation',
        'Good option for managing cramps and hormonal balance',
        'No daily pill to remember'
      ],
      sideEffects: 'Vaginal discharge, irritation possible',
      clinic: 'City Medical Center - OB/GYN',
      address: '789 Elm Street, Your City, ST 12345',
      distance: '1.5 miles away'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 3000);
    }
  };

  const handleConcernToggle = (concern) => {
    setHealthData(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter(c => c !== concern)
        : [...prev.concerns, concern]
    }));
  };

  const handleFileUpload = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'insurance') setInsuranceFile(file);
      if (type === 'id') setIdFile(file);
    }
  };

  const canProceedStep1 = healthData.age && healthData.weight && healthData.height && healthData.concerns.length > 0;
  const canProceedStep2 = insuranceFile && idFile;

  const handleGetRecommendations = () => {
    setShowResults(true);
  };

  const resetDemo = () => {
    setShowDemo(false);
    setDemoStep(1);
    setShowResults(false);
    setHealthData({
      age: '',
      weight: '',
      height: '',
      bloodPressure: 'normal',
      smoker: 'no',
      migraines: 'no',
      bloodClots: 'no',
      diabetes: 'no',
      concerns: []
    });
    setInsuranceFile(null);
    setIdFile(null);
  };

  if (showDemo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50 overflow-hidden">
        {/* Close button */}
        <button
          onClick={resetDemo}
          className="absolute top-6 right-6 z-50 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {!showResults ? (
          <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-normal text-purple-600">Step {demoStep} of 2</span>
                <span className="text-sm font-light text-gray-500">
                  {demoStep === 1 ? 'Health Profile' : 'Verification'}
                </span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(demoStep / 2) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step 1: Health Data */}
            {demoStep === 1 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                <h2 className="text-3xl font-light text-gray-900 mb-2">Tell us about yourself</h2>
                <p className="text-gray-600 font-light mb-8">This helps us find the best options for you</p>

                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2">Age</label>
                      <input
                        type="number"
                        value={healthData.age}
                        onChange={(e) => setHealthData({...healthData, age: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
                        placeholder="25"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2">Weight (lbs)</label>
                      <input
                        type="number"
                        value={healthData.weight}
                        onChange={(e) => setHealthData({...healthData, weight: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
                        placeholder="140"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2">Height (inches)</label>
                      <input
                        type="number"
                        value={healthData.height}
                        onChange={(e) => setHealthData({...healthData, height: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
                        placeholder="65"
                      />
                    </div>
                  </div>

                  {/* Health Conditions */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2">Blood Pressure</label>
                      <select
                        value={healthData.bloodPressure}
                        onChange={(e) => setHealthData({...healthData, bloodPressure: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
                      >
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2">Do you smoke?</label>
                      <select
                        value={healthData.smoker}
                        onChange={(e) => setHealthData({...healthData, smoker: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2">History of migraines?</label>
                      <select
                        value={healthData.migraines}
                        onChange={(e) => setHealthData({...healthData, migraines: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2">History of blood clots?</label>
                      <select
                        value={healthData.bloodClots}
                        onChange={(e) => setHealthData({...healthData, bloodClots: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                  </div>

                  {/* Concerns */}
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-3">
                      What are your main concerns? (Select all that apply)
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {concerns.map((concern) => (
                        <button
                          key={concern}
                          onClick={() => handleConcernToggle(concern)}
                          className={`px-4 py-3 rounded-xl border-2 transition-all text-left ${
                            healthData.concerns.includes(concern)
                              ? 'border-purple-500 bg-purple-50 text-purple-900'
                              : 'border-purple-200 bg-white text-gray-700 hover:border-purple-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-light">{concern}</span>
                            {healthData.concerns.includes(concern) && (
                              <CheckCircle className="w-5 h-5 text-purple-600" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setDemoStep(2)}
                  disabled={!canProceedStep1}
                  className={`mt-8 w-full px-8 py-4 rounded-xl font-normal flex items-center justify-center space-x-2 transition-all ${
                    canProceedStep1
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl transform hover:-translate-y-1'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>Continue</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Step 2: Upload Documents */}
            {demoStep === 2 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                <button
                  onClick={() => setDemoStep(1)}
                  className="mb-6 flex items-center space-x-2 text-purple-600 hover:text-purple-700"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="font-light">Back</span>
                </button>

                <h2 className="text-3xl font-light text-gray-900 mb-2">Verify your identity</h2>
                <p className="text-gray-600 font-light mb-8">We need these to process your prescription</p>

                <div className="space-y-6">
                  {/* Insurance Upload */}
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-3">
                      Insurance Card (Front & Back)
                    </label>
                    <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center hover:border-purple-500 transition-all">
                      <input
                        type="file"
                        id="insurance"
                        onChange={(e) => handleFileUpload('insurance', e)}
                        className="hidden"
                        accept="image/*"
                      />
                      <label htmlFor="insurance" className="cursor-pointer">
                        {insuranceFile ? (
                          <div className="flex items-center justify-center space-x-3 text-green-600">
                            <CheckCircle className="w-6 h-6" />
                            <span className="font-normal">{insuranceFile.name}</span>
                          </div>
                        ) : (
                          <div>
                            <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                            <p className="text-gray-600 font-light">Click to upload or drag and drop</p>
                            <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* ID Upload */}
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-3">
                      Government-Issued ID
                    </label>
                    <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center hover:border-purple-500 transition-all">
                      <input
                        type="file"
                        id="id"
                        onChange={(e) => handleFileUpload('id', e)}
                        className="hidden"
                        accept="image/*"
                      />
                      <label htmlFor="id" className="cursor-pointer">
                        {idFile ? (
                          <div className="flex items-center justify-center space-x-3 text-green-600">
                            <CheckCircle className="w-6 h-6" />
                            <span className="font-normal">{idFile.name}</span>
                          </div>
                        ) : (
                          <div>
                            <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                            <p className="text-gray-600 font-light">Click to upload or drag and drop</p>
                            <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-normal text-purple-900">Your privacy is protected</p>
                      <p className="text-sm text-purple-700 font-light mt-1">
                        All documents are encrypted and HIPAA compliant. We never share your information.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGetRecommendations}
                  disabled={!canProceedStep2}
                  className={`mt-8 w-full px-8 py-4 rounded-xl font-normal flex items-center justify-center space-x-2 transition-all ${
                    canProceedStep2
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl transform hover:-translate-y-1'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>Get My Recommendations</span>
                  <Sparkles className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Results Page */
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-4">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-normal text-gray-900">Analysis Complete</span>
              </div>
              <h2 className="text-4xl font-light text-gray-900 mb-3">Your Personalized Matches</h2>
              <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                Based on your health profile and preferences, here are the top 3 birth control options for you
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-normal rounded-full">
                          Match #{index + 1}
                        </span>
                        <h3 className="text-2xl font-normal text-gray-900">{rec.name}</h3>
                      </div>
                      <p className="text-purple-600 font-light">{rec.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 font-light">Effectiveness</p>
                      <p className="text-lg font-normal text-gray-900">{rec.effectiveness}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-normal text-gray-700 mb-3 flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-pink-600" />
                        <span>Why this is right for you</span>
                      </h4>
                      <ul className="space-y-2">
                        {rec.whyItFits.map((reason, i) => (
                          <li key={i} className="flex items-start space-x-2 text-gray-600 font-light text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-normal text-gray-700 mb-3 flex items-center space-x-2">
                        <Info className="w-4 h-4 text-blue-600" />
                        <span>What to know</span>
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <DollarSign className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500 font-light">Estimated Cost</p>
                            <p className="text-sm font-normal text-gray-900">{rec.cost}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Info className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500 font-light">Possible Side Effects</p>
                            <p className="text-sm font-light text-gray-700">{rec.sideEffects}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-purple-200 pt-6">
                    <h4 className="text-sm font-normal text-gray-700 mb-3 flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      <span>Nearby clinic</span>
                    </h4>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <p className="font-normal text-gray-900">{rec.clinic}</p>
                      <p className="text-sm text-gray-600 font-light mt-1">{rec.address}</p>
                      <p className="text-sm text-purple-600 font-light mt-1">{rec.distance}</p>
                      <button className="mt-3 px-4 py-2 bg-purple-600 text-white text-sm font-normal rounded-lg hover:bg-purple-700 transition-all">
                        Schedule Appointment
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={resetDemo}
                className="px-8 py-3 bg-white/80 backdrop-blur-sm text-purple-600 font-normal rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50 overflow-hidden font-light">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 text-purple-600 fill-purple-600" />
          <span className="text-2xl font-light tracking-wide bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            plana
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowDemo(true)}
            className="px-8 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-normal rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            Try Demo
          </button>
          <button className="px-8 py-2 text-purple-600 font-normal hover:bg-white/50 rounded-lg transition-all">
            Learn More
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-8 animate-bounce" style={{animationDuration: '3s'}}>
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-normal text-purple-900">Personalized birth control matching</span>
          </div>

          {/* Main headline */}
          <h1 className="text-6xl md:text-6xl font-extralight mb-6 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Your body. 
            </span>
            <br />
            <span className="text-gray-900">Your choice.</span>
            <br />
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-powered.
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            We match your unique health data with the most suitable birth control options. 
            Science-backed recommendations, personalized for you.
          </p>

          {/* Waitlist Form */}
          <div className="max-w-md mx-auto mb-16">
            {!submitted ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-purple-200 focus:border-purple-500 focus:outline-none shadow-lg transition-all font-light"
                  required
                />
                <button
                  onClick={handleSubmit}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-normal rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Join Waitlist</span>
                  <ArrowRight className={`w-5 h-5 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                </button>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg flex items-center justify-center space-x-3 animate-pulse">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-gray-900 font-normal">You're on the list! We'll be in touch soon.</span>
              </div>
            )}
            <p className="text-sm text-gray-500 mt-4 font-light">Join 5,000+ women waiting for early access</p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Fingerprint className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-normal text-gray-900 mb-3">Personalized Matching</h3>
              <p className="text-gray-600 font-light">
                Our AI analyzes your health data to recommend birth control options tailored specifically to you.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300" style={{transitionDelay: '100ms'}}>
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-normal text-gray-900 mb-3">Privacy First</h3>
              <p className="text-gray-600 font-light">
                Your health data is encrypted and secure. We prioritize your privacy above everything else.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300" style={{transitionDelay: '200ms'}}>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-normal text-gray-900 mb-3">Science-Backed</h3>
              <p className="text-gray-600 font-light">
                Every recommendation is based on the latest medical research and clinical guidelines.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-200/50 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-600">
          <p className="mb-2 font-light">© 2025 planai. Empowering informed choices.</p>
          <div className="flex justify-center space-x-6 text-sm font-light">
            <a href="#" className="hover:text-purple-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-purple-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-purple-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}