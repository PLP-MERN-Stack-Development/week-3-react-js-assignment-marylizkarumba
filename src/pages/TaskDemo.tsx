
import React from 'react';
import Layout from '@/components/Layout';
import TaskManager from '@/components/TaskManager';
import CustomCard from '@/components/ui/custom-card';

const TaskDemo = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CustomCard className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Task Manager Demo
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            This demo showcases the TaskManager component with full CRUD functionality, 
            filtering capabilities, and local storage persistence. Tasks are automatically 
            saved to your browser's local storage.
          </p>
        </CustomCard>
        
        <TaskManager />
      </div>
    </Layout>
  );
};

export default TaskDemo;
