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
    race: '',
    ethnicity: '',
    weight: '',
    height: '',
    bloodType: '',
    bloodPressure: 'normal',
    smoker: 'no',
    migraines: 'no',
    bloodClots: 'no',
    diabetes: 'no',
    birthControlsTried: [],
    currentBirthControl: '',
    sideEffects: [],
    activityLevel: '',
    concerns: []
  });
  
  const [insuranceFile, setInsuranceFile] = useState(null);
  const [idFile, setIdFile] = useState(null);
  const [hasInsurance, setHasInsurance] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [connectedWearables, setConnectedWearables] = useState([]);
  const [expandedRecommendation, setExpandedRecommendation] = useState(null);

  const concerns = [
    'Acne management',
    'Period regulation',
    'Cramp relief',
    'Hormone balance',
    'Convenience',
    'Long-term protection'
  ];

  const birthControlOptions = [
    'Combination Pill',
    'Progestin-only Pill',
    'Patch',
    'Ring',
    'Hormonal IUD',
    'Copper IUD',
    'Implant',
    'Shot (Depo-Provera)',
    'Condoms',
    'None'
  ];

  const commonSideEffects = [
    'Nausea',
    'Headaches',
    'Mood changes',
    'Weight gain',
    'Breast tenderness',
    'Irregular bleeding',
    'Acne',
    'Decreased libido'
  ];

  const recommendations = [
    {
      name: 'Combination Pill (Yaz)',
      type: 'Oral Contraceptive',
      effectiveness: '99% with perfect use',
      cost: '$15-25/month',
      matchScore: 94,
      whyItFits: [
        'Perfect for hormone balance and acne management based on your concerns',
        'No contraindications with your health profile',
        'Daily routine fits well with your lifestyle preferences',
        'Helps with period regulation you mentioned'
      ],
      sideEffects: 'Mild nausea initially, breast tenderness',
      clinic: 'Women\'s Health Clinic',
      address: '456 Oak Ave, Your City, ST 12345',
      distance: '3.7 miles away',
      aiAnalysis: {
        featureImportance: [
          { feature: 'Acne management concern', impact: 95, positive: true },
          { feature: 'Hormone balance goal', impact: 90, positive: true },
          { feature: 'Period regulation need', impact: 88, positive: true },
          { feature: 'Normal blood pressure', impact: 85, positive: true },
          { feature: 'Non-smoker status', impact: 82, positive: true },
          { feature: 'No migraine history', impact: 80, positive: true },
          { feature: 'Age group compatibility', impact: 75, positive: true }
        ],
        compatibilityFactors: {
          healthProfile: 96,
          lifestyle: 92,
          concerns: 94,
          sideEffectTolerance: 90
        },
        riskFactors: [
          { factor: 'No significant risk factors detected', level: 'low' }
        ]
      }
    },
    {
      name: 'Hormonal IUD (Mirena)',
      type: 'Intrauterine Device',
      effectiveness: '99.8% effective',
      cost: '$0-1,300 (often covered by insurance)',
      matchScore: 91,
      whyItFits: [
        'Long-term protection matches your convenience preference',
        'Excellent for cramp relief - periods often become lighter or stop',
        'Set it and forget it for 5-8 years',
        'No daily routine required'
      ],
      sideEffects: 'Irregular bleeding first 3-6 months, insertion discomfort',
      clinic: 'Women\'s Health Clinic',
      address: '456 Oak Ave, Your City, ST 12345',
      distance: '3.7 miles away',
      aiAnalysis: {
        featureImportance: [
          { feature: 'Long-term protection desire', impact: 98, positive: true },
          { feature: 'Convenience priority', impact: 95, positive: true },
          { feature: 'Cramp relief need', impact: 92, positive: true },
          { feature: 'Active lifestyle compatibility', impact: 88, positive: true },
          { feature: 'Low maintenance preference', impact: 85, positive: true },
          { feature: 'Hormone balance goal', impact: 80, positive: true }
        ],
        compatibilityFactors: {
          healthProfile: 94,
          lifestyle: 95,
          concerns: 89,
          sideEffectTolerance: 85
        },
        riskFactors: [
          { factor: 'Initial adjustment period (3-6 months)', level: 'low' },
          { factor: 'Insertion discomfort', level: 'low' }
        ]
      }
    },
    {
      name: 'NuvaRing',
      type: 'Vaginal Ring',
      effectiveness: '99% with perfect use',
      cost: '$0-200/month (usually covered)',
      matchScore: 87,
      whyItFits: [
        'Monthly change aligns with your preference for low maintenance',
        'Steady hormone levels help with period regulation',
        'Good option for managing cramps and hormonal balance',
        'No daily pill to remember'
      ],
      sideEffects: 'Vaginal discharge, irritation possible',
      clinic: 'Women\'s Health Clinic',
      address: '456 Oak Ave, Your City, ST 12345',
      distance: '3.7 miles away',
      aiAnalysis: {
        featureImportance: [
          { feature: 'Period regulation goal', impact: 90, positive: true },
          { feature: 'Hormone balance need', impact: 88, positive: true },
          { feature: 'Low maintenance preference', impact: 85, positive: true },
          { feature: 'Normal blood pressure', impact: 82, positive: true },
          { feature: 'Non-smoker status', impact: 80, positive: true },
          { feature: 'Cramp relief need', impact: 78, positive: true }
        ],
        compatibilityFactors: {
          healthProfile: 92,
          lifestyle: 88,
          concerns: 87,
          sideEffectTolerance: 82
        },
        riskFactors: [
          { factor: 'Potential vaginal irritation', level: 'low' },
          { factor: 'Requires comfort with insertion', level: 'medium' }
        ]
      }
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

  const handleBirthControlToggle = (bc) => {
    setHealthData(prev => ({
      ...prev,
      birthControlsTried: prev.birthControlsTried.includes(bc)
        ? prev.birthControlsTried.filter(b => b !== bc)
        : [...prev.birthControlsTried, bc]
    }));
  };

  const handleSideEffectToggle = (effect) => {
    setHealthData(prev => ({
      ...prev,
      sideEffects: prev.sideEffects.includes(effect)
        ? prev.sideEffects.filter(e => e !== effect)
        : [...prev.sideEffects, effect]
    }));
  };

  const handleFileUpload = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'insurance') setInsuranceFile(file);
      if (type === 'id') setIdFile(file);
    }
  };

  const toggleWearable = (wearableName) => {
    setConnectedWearables(prev => 
      prev.includes(wearableName)
        ? prev.filter(w => w !== wearableName)
        : [...prev, wearableName]
    );
  };

  const canProceedStep1 = healthData.age && healthData.race && healthData.ethnicity && 
    healthData.weight && healthData.height && healthData.bloodType && 
    healthData.activityLevel && healthData.concerns.length > 0;
  const canProceedStep2 = idFile && (hasInsurance ? insuranceFile : true);
  const canProceedStep3 = true; // Wearables are optional

  const wearables = [
    {
      name: 'Whoop',
      description: 'Track recovery, strain, and sleep data',
      connected: false
    },
    {
      name: 'Oura Ring',
      description: 'Monitor sleep, activity, and readiness',
      connected: false
    },
    {
      name: 'Apple Watch',
      description: 'Sync health and activity metrics',
      connected: false
    },
    {
      name: 'Fitbit',
      description: 'Connect fitness and health data',
      connected: false
    }
  ];

  const handleGetRecommendations = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 3000);
  };

  const resetDemo = () => {
    setShowDemo(false);
    setDemoStep(1);
    setShowResults(false);
    setIsLoading(false);
    setHasInsurance(true);
    setConnectedWearables([]);
    setExpandedRecommendation(null);
    setHealthData({
      age: '',
      race: '',
      ethnicity: '',
      weight: '',
      height: '',
      bloodType: '',
      bloodPressure: 'normal',
      smoker: 'no',
      migraines: 'no',
      bloodClots: 'no',
      diabetes: 'no',
      birthControlsTried: [],
      currentBirthControl: '',
      sideEffects: [],
      activityLevel: '',
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

        {!showResults && !isLoading ? (
          <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-normal text-purple-600">Step {demoStep} of 3</span>
                <span className="text-sm font-light text-gray-500">
                  {demoStep === 1 ? 'Health Profile' : demoStep === 2 ? 'Verification' : 'Wearables (Optional)'}
                </span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(demoStep / 3) * 100}%` }}
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
                      <label className="block text-sm font-normal text-gray-700 mb-2">Age *</label>
                      <input
                        type="number"
                        value={healthData.age}
                        onChange={(e) => setHealthData({...healthData, age: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
                        placeholder="25"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2">Weight (lbs) *</label>
                      <input
                        type="number"
                        value={healthData.weight}
                        onChange={(e) => setHealthData({...healthData, weight: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
                        placeholder="140"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2">Height (inches) *</label>
                      <input
                        type="number"
                        value={healthData.height}
                        onChange={(e) => setHealthData({...healthData, height: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
                        placeholder="65"
                      />
                    </div>
                  </div>

                  {/* Race, Ethnicity, Blood Type */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2">Race *</label>
                      <select
                        value={healthData.race}
                        onChange={(e) => setHealthData({...healthData, race: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
                      >
                        <option value="">Select...</option>
                        <option value="american-indian">American Indian or Alaska Native</option>
                        <option value="asian">Asian</option>
                        <option value="black">Black or African American</option>
                        <option value="pacific-islander">Native Hawaiian or Pacific Islander</option>
                        <option value="white">White</option>
                        <option value="other">Other</option>
                        <option value="prefer-not">Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2">Ethnicity *</label>
                      <select
                        value={healthData.ethnicity}
                        onChange={(e) => setHealthData({...healthData, ethnicity: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
                      >
                        <option value="">Select...</option>
                        <option value="hispanic">Hispanic or Latino</option>
                        <option value="non-hispanic">Not Hispanic or Latino</option>
                        <option value="prefer-not">Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2">Blood Type *</label>
                      <select
                        value={healthData.bloodType}
                        onChange={(e) => setHealthData({...healthData, bloodType: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
                      >
                        <option value="">Select...</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="unknown">Don't know</option>
                      </select>
                    </div>
                  </div>

                  {/* Activity Level */}
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2">Activity Level *</label>
                    <select
                      value={healthData.activityLevel}
                      onChange={(e) => setHealthData({...healthData, activityLevel: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
                    >
                      <option value="">Select...</option>
                      <option value="sedentary">Sedentary (little or no exercise)</option>
                      <option value="light">Lightly active (1-3 days/week)</option>
                      <option value="moderate">Moderately active (3-5 days/week)</option>
                      <option value="very">Very active (6-7 days/week)</option>
                      <option value="extra">Extremely active (physical job or training)</option>
                    </select>
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

                  {/* Birth Control History */}
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-3">
                      Birth controls you've tried (Select all that apply)
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {birthControlOptions.map((bc) => (
                        <button
                          key={bc}
                          onClick={() => handleBirthControlToggle(bc)}
                          className={`px-4 py-3 rounded-xl border-2 transition-all text-left ${
                            healthData.birthControlsTried.includes(bc)
                              ? 'border-purple-500 bg-purple-50 text-purple-900'
                              : 'border-purple-200 bg-white text-gray-700 hover:border-purple-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-light">{bc}</span>
                            {healthData.birthControlsTried.includes(bc) && (
                              <CheckCircle className="w-5 h-5 text-purple-600" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Current Birth Control */}
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2">
                      Current birth control (if any)
                    </label>
                    <select
                      value={healthData.currentBirthControl}
                      onChange={(e) => setHealthData({...healthData, currentBirthControl: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
                    >
                      <option value="">None / Not currently using</option>
                      {birthControlOptions.filter(bc => bc !== 'None').map((bc) => (
                        <option key={bc} value={bc}>{bc}</option>
                      ))}
                    </select>
                  </div>

                  {/* Side Effects Experienced */}
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-3">
                      Side effects you've experienced (Select all that apply)
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {commonSideEffects.map((effect) => (
                        <button
                          key={effect}
                          onClick={() => handleSideEffectToggle(effect)}
                          className={`px-4 py-3 rounded-xl border-2 transition-all text-left ${
                            healthData.sideEffects.includes(effect)
                              ? 'border-orange-500 bg-orange-50 text-orange-900'
                              : 'border-purple-200 bg-white text-gray-700 hover:border-purple-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-light">{effect}</span>
                            {healthData.sideEffects.includes(effect) && (
                              <CheckCircle className="w-5 h-5 text-orange-600" />
                            )}
                          </div>
                        </button>
                      ))}
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
                  {/* Insurance Toggle */}
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                    <div>
                      <p className="font-normal text-gray-900">Do you have insurance?</p>
                      <p className="text-sm text-gray-600 font-light mt-1">
                        We'll help you find the most affordable options
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => {
                          setHasInsurance(false);
                          setInsuranceFile(null);
                        }}
                        className={`px-4 py-2 rounded-lg font-normal transition-all ${
                          !hasInsurance
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        No
                      </button>
                      <button
                        onClick={() => setHasInsurance(true)}
                        className={`px-4 py-2 rounded-lg font-normal transition-all ${
                          hasInsurance
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Yes
                      </button>
                    </div>
                  </div>

                  {/* Insurance Upload - Conditional */}
                  {hasInsurance && (
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
                  )}

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
                  onClick={() => setDemoStep(3)}
                  disabled={!canProceedStep2}
                  className={`mt-8 w-full px-8 py-4 rounded-xl font-normal flex items-center justify-center space-x-2 transition-all ${
                    canProceedStep2
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl transform hover:-translate-y-1'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>Continue</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Step 3: Connect Wearables */}
            {demoStep === 3 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                <button
                  onClick={() => setDemoStep(2)}
                  className="mb-6 flex items-center space-x-2 text-purple-600 hover:text-purple-700"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="font-light">Back</span>
                </button>

                <h2 className="text-3xl font-light text-gray-900 mb-2">Connect your wearables</h2>
                <p className="text-gray-600 font-light mb-2">
                  Sync your health data for more personalized recommendations
                </p>
                <p className="text-sm text-purple-600 font-light mb-8">Optional - Skip if you prefer</p>

                <div className="space-y-4 mb-8">
                  {wearables.map((wearable) => {
                    const isConnected = connectedWearables.includes(wearable.name);
                    return (
                      <div
                        key={wearable.name}
                        className={`border-2 rounded-xl p-6 transition-all cursor-pointer ${
                          isConnected
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-purple-200 bg-white hover:border-purple-300'
                        }`}
                        onClick={() => toggleWearable(wearable.name)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="text-4xl">{wearable.icon}</div>
                            <div>
                              <h3 className="font-normal text-gray-900 text-lg">{wearable.name}</h3>
                              <p className="text-sm text-gray-600 font-light">{wearable.description}</p>
                            </div>
                          </div>
                          {isConnected ? (
                            <div className="flex items-center space-x-2 text-green-600">
                              <CheckCircle className="w-6 h-6" />
                              <span className="font-normal">Connected</span>
                            </div>
                          ) : (
                            <button className="px-4 py-2 bg-purple-600 text-white font-normal rounded-lg hover:bg-purple-700 transition-all">
                              Connect
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start space-x-3 mb-6">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-normal text-blue-900">Why connect wearables?</p>
                    <p className="text-sm text-blue-700 font-light mt-1">
                      Data like sleep patterns, heart rate variability, and activity levels help us understand how different birth control options might affect your body.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleGetRecommendations}
                    className="flex-1 px-8 py-4 bg-white border-2 border-purple-200 text-purple-600 font-normal rounded-xl hover:border-purple-300 transition-all"
                  >
                    Skip for now
                  </button>
                  <button
                    onClick={handleGetRecommendations}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-normal rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Get My Recommendations</span>
                    <Sparkles className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : isLoading ? (
          /* Loading Screen */
          <div className="max-w-4xl mx-auto px-6 py-12 flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-8">
                <div className="absolute inset-0 border-8 border-purple-200 rounded-full"></div>
                <div className="absolute inset-0 border-8 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-purple-600 animate-pulse" />
                </div>
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-3">Analyzing your profile...</h3>
              <p className="text-gray-600 font-light">Our AI is matching you with the best options</p>
              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-center space-x-3 text-gray-600">
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                  <span className="text-sm font-light">Reviewing your health data</span>
                </div>
                <div className="flex items-center justify-center space-x-3 text-gray-600" style={{animationDelay: '0.2s'}}>
                  <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <span className="text-sm font-light">Comparing birth control options</span>
                </div>
                <div className="flex items-center justify-center space-x-3 text-gray-600" style={{animationDelay: '0.4s'}}>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  <span className="text-sm font-light">Finding nearby clinics</span>
                </div>
              </div>
            </div>
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

                  {/* AI Analysis Section */}
                  <div className="border-t border-purple-200 mt-6 pt-6">
                    <button
                      onClick={() => setExpandedRecommendation(expandedRecommendation === index ? null : index)}
                      className="w-full flex items-center justify-between text-left hover:bg-purple-50 rounded-lg p-3 transition-all"
                    >
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        <div>
                          <h4 className="text-sm font-normal text-gray-900">How AI matched you</h4>
                          <p className="text-xs text-gray-500 font-light">See the data-driven evidence</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="px-3 py-1 bg-green-100 text-green-700 text-sm font-normal rounded-full">
                          {rec.matchScore}% Match
                        </div>
                        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedRecommendation === index ? 'rotate-90' : ''}`} />
                      </div>
                    </button>

                    {expandedRecommendation === index && (
                      <div className="mt-4 space-y-6 animate-in">
                        {/* Compatibility Breakdown */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                          <h5 className="text-sm font-normal text-gray-900 mb-4 flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-purple-600" />
                            <span>Compatibility Breakdown</span>
                          </h5>
                          <div className="space-y-3">
                            {Object.entries(rec.aiAnalysis.compatibilityFactors).map(([category, score]) => (
                              <div key={category}>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm font-light text-gray-700 capitalize">
                                    {category.replace(/([A-Z])/g, ' $1').trim()}
                                  </span>
                                  <span className="text-sm font-normal text-purple-600">{score}%</span>
                                </div>
                                <div className="w-full bg-purple-200 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-1000"
                                    style={{ width: `${score}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Feature Importance */}
                        <div>
                          <h5 className="text-sm font-normal text-gray-900 mb-4 flex items-center space-x-2">
                            <Fingerprint className="w-4 h-4 text-purple-600" />
                            <span>Key Factors in Your Match</span>
                          </h5>
                          <div className="space-y-2">
                            {rec.aiAnalysis.featureImportance.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-3 bg-white rounded-lg p-3 border border-purple-100"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-light text-gray-700">{item.feature}</span>
                                    <span className="text-xs font-normal text-purple-600">{item.impact}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div
                                      className={`h-1.5 rounded-full ${
                                        item.positive ? 'bg-green-500' : 'bg-orange-500'
                                      }`}
                                      style={{ width: `${item.impact}%` }}
                                    ></div>
                                  </div>
                                </div>
                                {item.positive && (
                                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Risk Assessment */}
                        <div>
                          <h5 className="text-sm font-normal text-gray-900 mb-3 flex items-center space-x-2">
                            <Info className="w-4 h-4 text-blue-600" />
                            <span>Risk Assessment</span>
                          </h5>
                          <div className="space-y-2">
                            {rec.aiAnalysis.riskFactors.map((risk, idx) => (
                              <div
                                key={idx}
                                className={`flex items-start space-x-3 rounded-lg p-3 ${
                                  risk.level === 'low'
                                    ? 'bg-green-50 border border-green-200'
                                    : risk.level === 'medium'
                                    ? 'bg-yellow-50 border border-yellow-200'
                                    : 'bg-red-50 border border-red-200'
                                }`}
                              >
                                <div
                                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                                    risk.level === 'low'
                                      ? 'bg-green-500'
                                      : risk.level === 'medium'
                                      ? 'bg-yellow-500'
                                      : 'bg-red-500'
                                  }`}
                                ></div>
                                <div className="flex-1">
                                  <p className="text-sm font-light text-gray-700">{risk.factor}</p>
                                  <p className="text-xs text-gray-500 font-light mt-0.5 capitalize">
                                    {risk.level} risk
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* AI Confidence Note */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-normal text-blue-900">AI Confidence Level: High</p>
                              <p className="text-xs text-blue-700 font-light mt-1">
                                This recommendation is based on analysis of your complete health profile, lifestyle factors, 
                                and comparison with clinical outcomes from similar user profiles. Always consult with a 
                                healthcare provider before making decisions.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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
            PlanAi
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
              Find the right birth control.
            </span>
            <br />
            <span className="text-gray-900">Without the trial and error.</span>
            <br />
            {/* <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-powered.
            </span> */}
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            We personalize your birth control based on your health and lifestyle.
          </p>
          {/* <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Science-backed recommendations, personalized for you.
          </p> */}

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
          <p className="mb-2 font-light">© 2025 PlanAi. Empowering informed choices.</p>
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