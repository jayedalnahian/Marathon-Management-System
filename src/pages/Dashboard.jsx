import React, { useState } from 'react';
import AddMarathon from './AddMarathon';
import MyMarathonList from './MyMarathonList';
import MyAppliedMarathons from './MyAppliedMarathons';

// import 'react-datepicker/dist/react-datepicker.css';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('list');
    return (
        <div className='w-10/12 mx-auto'>
            <div className='flex justify-center items-center'>
                <div role="tablist" className="tabs tabs-lift">


                    <button
                        onClick={() => setActiveTab('add')}
                        role="tab"
                        className={`tab text-xl ${activeTab === 'add' ? 'tab-active' : ''}`}
                    >
                        Add Marathon
                    </button>
                    <button
                        onClick={() => setActiveTab('list')}
                        role="tab"
                        className={`tab  text-xl ${activeTab === 'list' ? 'tab-active' : ''}`}
                    >
                        My Marathon List
                    </button>
                    <button
                        onClick={() => setActiveTab('apply')}
                        role="tab"
                        className={`tab  text-xl ${activeTab === 'apply' ? 'tab-active' : ''}`}
                    >
                        My Applied Marathons
                    </button>
                </div>
            </div>

            <div className="mt-4">
                {activeTab === 'list' && <div><MyMarathonList></MyMarathonList></div>}
                {activeTab === 'add' && <div><AddMarathon></AddMarathon></div>}
                {activeTab === 'apply' && <div><MyAppliedMarathons></MyAppliedMarathons></div>}
            </div>
        </div>
    );
};

export default Dashboard;