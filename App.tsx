
import React, { useState, useEffect } from 'react';
import JobHeader from './components/JobHeader';
import JobCard from './components/JobCard';
import ProfileScreen from './components/ProfileScreen';
import ContractorProfileScreen from './components/ContractorProfileScreen';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import RoleSelection from './components/RoleSelection';
import NameInputScreen from './components/NameInputScreen';
import PhotoUploadScreen from './components/PhotoUploadScreen';
import AddressInputScreen from './components/AddressInputScreen';
import LocationTracking from './components/LocationTracking';
import MyJobsScreen from './components/MyJobsScreen';
import JobAlarm from './components/JobAlarm';
import JobPostScreen from './components/JobPostScreen';

type FlowStep = 'login' | 'role-selection' | 'name-input' | 'photo-upload' | 'address-input' | 'app' | 'tracking';

export interface WorkHistoryItem {
  id: string;
  role: string;
  price: string;
  location: string;
  distance: string;
  days: string;
  status: 'completed' | 'settled' | 'ongoing' | 'reached';
  date: string;
}

export interface Job {
  id: number;
  role: string;
  pay: string;
  payType?: string;
  distance?: string;
  duration: string;
  progress: number;
  type: string;
  workersNeeded?: number;
}

export interface UserProfile {
  name: string;
  roles: string[];
  roleType: 'worker' | 'contractor' | 'employer';
  photo: string;
  rating: number;
  totalRatings: number;
  earnings: number;
  workDays: number;
  level: string;
  workHistory: WorkHistoryItem[];
  phone?: string;
  address?: string;
  coords?: { lat: number, lng: number };
  jobsPosted?: number;
  workersHired?: number;
  totalPayment?: number;
}

const INITIAL_JOBS: Job[] = [
  {
    id: 1,
    role: 'मिस्त्री चाहिए',
    pay: '₹700 / दिन',
    distance: '2 किमी.',
    duration: '5 दिन',
    progress: 40,
    type: 'mason'
  },
  {
    id: 2,
    role: 'प्लंबर चाहिए',
    pay: '₹650 / दिन',
    distance: '1.5 किमी.',
    duration: '7 दिन',
    progress: 60,
    type: 'plumber'
  },
  {
    id: 3,
    role: 'रंगाई पुताई का काम',
    pay: '₹20,000',
    payType: '/ कांट्रेक्ट',
    duration: '15 दिन',
    progress: 30,
    type: 'painter'
  }
];

const App: React.FC = () => {
  const [flowStep, setFlowStep] = useState<FlowStep>(() => {
    const saved = localStorage.getItem('rs_current_user_phone');
    return saved ? 'app' : 'login';
  });
  
  const [activeTab, setActiveTab] = useState('jobs');
  const [mobileNumber, setMobileNumber] = useState('');
  const [availableJobs, setAvailableJobs] = useState<Job[]>(INITIAL_JOBS);
  const [acceptedJobs, setAcceptedJobs] = useState<Job[]>([]);
  const [showAlarm, setShowAlarm] = useState<Job | null>(null);
  const [pendingRole, setPendingRole] = useState<'worker' | 'contractor' | 'employer'>('worker');
  const [pendingName, setPendingName] = useState('');
  const [pendingPhoto, setPendingPhoto] = useState('');
  
  const [user, setUser] = useState<UserProfile | null>(() => {
    const currentPhone = localStorage.getItem('rs_current_user_phone');
    if (currentPhone) {
      const usersList = JSON.parse(localStorage.getItem('rs_users_database') || '{}');
      return usersList[currentPhone] || null;
    }
    return null;
  });

  const [activeJob, setActiveJob] = useState<any>(null);

  useEffect(() => {
    if (user && user.phone) {
      const usersList = JSON.parse(localStorage.getItem('rs_users_database') || '{}');
      usersList[user.phone] = user;
      localStorage.setItem('rs_users_database', JSON.stringify(usersList));
    }
  }, [user]);

  useEffect(() => {
    if (flowStep === 'app' && user?.roleType === 'worker' && !showAlarm && availableJobs.length > 0) {
      const timer = setTimeout(() => {
        const newJob: Job = {
          id: 999,
          role: 'मिस्त्री चाहिए',
          pay: '₹700 / दिन',
          distance: '1 किमी',
          duration: '5 दिन',
          progress: 0,
          type: 'mason'
        };
        setShowAlarm(newJob);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [flowStep, availableJobs, user]);

  const handleSendOTP = () => {
    if (mobileNumber.length === 10) {
      const usersList = JSON.parse(localStorage.getItem('rs_users_database') || '{}');
      const existingUser = usersList[mobileNumber];
      if (existingUser) {
        setUser(existingUser);
        localStorage.setItem('rs_current_user_phone', mobileNumber);
        setFlowStep('app');
      } else {
        setFlowStep('role-selection');
      }
    } else {
      alert('कृपया एक वैध मोबाइल नंबर दर्ज करें');
    }
  };

  const handleRoleSelect = (role: string) => {
    setPendingRole(role as any);
    setFlowStep('name-input');
  };

  const handleNameSubmit = (name: string) => {
    setPendingName(name);
    if (pendingRole === 'worker') {
      finalizeUser(name, '', '', null);
      setFlowStep('app');
    } else {
      setFlowStep('photo-upload');
    }
  };

  const handlePhotoSubmit = (photo: string) => {
    setPendingPhoto(photo);
    setFlowStep('address-input');
  };

  const handleAddressSubmit = (address: string, coords: { lat: number, lng: number } | null) => {
    finalizeUser(pendingName, pendingPhoto, address, coords);
  };

  const finalizeUser = (name: string, photo: string, address: string, coords: { lat: number, lng: number } | null) => {
    const roleMap = {
      worker: 'मज़दूर',
      contractor: 'ठेकेदार',
      employer: 'काम देने वाला'
    };
    
    const newUser: UserProfile = {
      name: name,
      roles: [roleMap[pendingRole]],
      roleType: pendingRole,
      photo: photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}&accessories=none&top=shortHair&hairColor=black&facialHair=none&clothing=shirtVNeck&clothingColor=f59e0b`,
      rating: 4.6,
      totalRatings: 120,
      earnings: 0,
      workDays: 0,
      level: 'L1',
      workHistory: [],
      phone: mobileNumber,
      address: address,
      coords: coords || undefined,
      jobsPosted: pendingRole !== 'worker' ? 42 : undefined,
      workersHired: pendingRole !== 'worker' ? 85 : undefined,
      totalPayment: pendingRole !== 'worker' ? 425000 : undefined
    };
    const usersList = JSON.parse(localStorage.getItem('rs_users_database') || '{}');
    usersList[mobileNumber] = newUser;
    localStorage.setItem('rs_users_database', JSON.stringify(usersList));
    localStorage.setItem('rs_current_user_phone', mobileNumber);
    setUser(newUser);
    setFlowStep('app');
  };

  const handleLogout = () => {
    localStorage.removeItem('rs_current_user_phone');
    setUser(null);
    setMobileNumber('');
    setFlowStep('login');
    setActiveTab('jobs');
  };

  const handleAcceptJob = (job: Job) => {
    if (!user) return;
    setActiveJob(job);
    setShowAlarm(null);
    setAvailableJobs(prev => prev.filter(j => j.id !== job.id));
    setAcceptedJobs(prev => [job, ...prev]);
    const historyItem: WorkHistoryItem = {
      id: job.id.toString(),
      role: job.role.replace(' चाहिए', ''),
      price: job.pay.split(' ')[0],
      location: 'नजदीकी',
      distance: job.distance || '0 किमी',
      days: job.duration,
      status: 'ongoing',
      date: new Date().toLocaleDateString('hi-IN')
    };
    setUser({ ...user, workHistory: [historyItem, ...user.workHistory] });
    setFlowStep('tracking');
  };

  const handleRejectJob = (id: number) => {
    setAvailableJobs(prev => prev.filter(j => j.id !== id));
    setShowAlarm(null);
  };

  const handleJobReached = (id: string) => {
    if (!user) return;
    setUser({
      ...user,
      workHistory: user.workHistory.map(h => h.id === id ? { ...h, status: 'reached' } : h)
    });
  };

  const handlePostJob = (jobData: any) => {
    alert('काम सफलतापूर्वक पोस्ट किया गया!');
    setActiveTab('jobs');
  };

  return (
    <div className="relative w-full h-screen max-w-md mx-auto bg-[#fdf8f2] flex flex-col overflow-hidden select-none shadow-2xl">
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {showAlarm && (
          <JobAlarm 
            job={showAlarm} 
            onAccept={handleAcceptJob} 
            onDecline={() => setShowAlarm(null)} 
          />
        )}

        {flowStep === 'login' ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <Header />
            <div className="w-full mt-10">
              <LoginForm 
                value={mobileNumber} 
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                onSubmit={handleSendOTP}
              />
            </div>
          </div>
        ) : flowStep === 'role-selection' ? (
          <RoleSelection onSelect={handleRoleSelect} onBack={() => setFlowStep('login')} />
        ) : flowStep === 'name-input' ? (
          <NameInputScreen onSubmit={handleNameSubmit} onBack={() => setFlowStep('role-selection')} />
        ) : flowStep === 'photo-upload' ? (
          <PhotoUploadScreen onUpload={handlePhotoSubmit} onBack={() => setFlowStep('name-input')} />
        ) : flowStep === 'address-input' ? (
          <AddressInputScreen onAddressSubmit={handleAddressSubmit} onBack={() => setFlowStep('photo-upload')} />
        ) : flowStep === 'tracking' ? (
          <LocationTracking 
            onBack={() => setFlowStep('app')} 
            job={activeJob} 
            workerName={user?.name || "शिव कुमार"} 
            onReached={() => handleJobReached(activeJob.id.toString())}
          />
        ) : (
          <>
            <div className="flex-1 flex flex-col overflow-hidden">
              {activeTab === 'jobs' ? (
                user?.roleType === 'worker' ? (
                  <>
                    <JobHeader title="नजदिकी काम" />
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-24">
                      {availableJobs.length > 0 ? (
                        availableJobs.map(job => (
                          <JobCard key={job.id} job={job} onAccept={() => handleAcceptJob(job)} onReject={() => handleRejectJob(job.id)} />
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400 font-hindi">
                          <p className="text-xl">अभी और काम नहीं है</p>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <JobPostScreen onPost={handlePostJob} />
                )
              ) : activeTab === 'my-jobs' ? (
                <MyJobsScreen jobs={acceptedJobs} onJobClick={(job) => { setActiveJob(job); setFlowStep('tracking'); }} />
              ) : activeTab === 'profile' ? (
                user?.roleType === 'worker' ? (
                  <ProfileScreen user={user} onUpdateUser={setUser} onLogout={handleLogout} />
                ) : (
                  <ContractorProfileScreen user={user} onUpdateUser={setUser} onLogout={handleLogout} onPostNewJob={() => setActiveTab('jobs')} />
                )
              ) : null}
            </div>
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
