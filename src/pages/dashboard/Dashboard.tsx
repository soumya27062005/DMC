import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  BarChart3,
  Calendar,
  Download,
  Eye,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Task {
  id: string;
  title: string;
  category: 'Assignment' | 'Project' | 'Research' | 'Presentation';
  status: 'Submitted' | 'In Progress' | 'Completed' | 'Revision';
  deadline: string;
  amount: number;
  submittedAt: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  // Mock data - in real app, this would come from API
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Database Management System Assignment',
      category: 'Assignment',
      status: 'Completed',
      deadline: '2024-01-15',
      amount: 500,
      submittedAt: '2024-01-10',
    },
    {
      id: '2',
      title: 'React.js E-commerce Project',
      category: 'Project',
      status: 'In Progress',
      deadline: '2024-01-20',
      amount: 1200,
      submittedAt: '2024-01-12',
    },
    {
      id: '3',
      title: 'Machine Learning Research Paper',
      category: 'Research',
      status: 'Submitted',
      deadline: '2024-01-25',
      amount: 800,
      submittedAt: '2024-01-13',
    },
    {
      id: '4',
      title: 'Business Strategy Presentation',
      category: 'Presentation',
      status: 'Revision',
      deadline: '2024-01-18',
      amount: 600,
      submittedAt: '2024-01-11',
    },
  ];

  const stats = [
    {
      title: 'Total Tasks',
      value: tasks.length.toString(),
      change: '+12%',
      icon: FileText,
      color: 'from-blue-500 to-purple-500',
    },
    {
      title: 'Completed',
      value: tasks.filter(t => t.status === 'Completed').length.toString(),
      change: '+8%',
      icon: CheckCircle,
      color: 'from-green-500 to-teal-500',
    },
    {
      title: 'In Progress',
      value: tasks.filter(t => t.status === 'In Progress').length.toString(),
      change: '+4%',
      icon: Clock,
      color: 'from-orange-500 to-yellow-500',
    },
    {
      title: 'Total Spent',
      value: `₹${tasks.reduce((sum, task) => sum + task.amount, 0)}`,
      change: '+15%',
      icon: DollarSign,
      color: 'from-pink-500 to-rose-500',
    },
  ];

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400';
      case 'In Progress':
        return 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400';
      case 'Submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Revision':
        return 'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-400';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  const getCategoryColor = (category: Task['category']) => {
    switch (category) {
      case 'Assignment':
        return 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400';
      case 'Project':
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/20 dark:text-secondary-400';
      case 'Research':
        return 'bg-accent-100 text-accent-800 dark:bg-accent-900/20 dark:text-accent-400';
      case 'Presentation':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Here's what's happening with your academic tasks
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 md:mt-0"
        >
          <Link
            to="/submit-task"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl group"
          >
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-200" />
            Submit New Task
          </Link>
        </motion.div>
        <p className='text-green-600'>{message}</p>
</div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-success-500 mr-1" />
                  <span className="text-sm text-success-600 dark:text-success-400">
                    {stat.change}
                  </span>
                  <p className='text-green-600'>{message}</p>
</div>
                <p className='text-green-600'>{message}</p>
</div>
              <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl`}>
                <stat.icon className="w-6 h-6 text-white" />
                <p className='text-green-600'>{message}</p>
</div>
              <p className='text-green-600'>{message}</p>
</div>
          </motion.div>
        ))}
        <p className='text-green-600'>{message}</p>
</div>

      {/* Recent Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/20"
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
              Recent Tasks
            </h2>
            <div className="flex space-x-2">
              {['7d', '30d', '90d'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors duration-200 ${
                    selectedPeriod === period
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {period === '7d' ? 'Last 7 days' : period === '30d' ? 'Last 30 days' : 'Last 90 days'}
                </button>
              ))}
              <p className='text-green-600'>{message}</p>
</div>
            <p className='text-green-600'>{message}</p>
</div>
          <p className='text-green-600'>{message}</p>
</div>

        <div className="p-6">
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                    <p className='text-green-600'>{message}</p>
</div>
                  <div>
                    <h3 className="font-medium text-slate-800 dark:text-white">
                      {task.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(task.category)}`}>
                        {task.category}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                      <p className='text-green-600'>{message}</p>
</div>
                    <p className='text-green-600'>{message}</p>
</div>
                  <p className='text-green-600'>{message}</p>
</div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-800 dark:text-white">
                      ₹{task.amount}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Due: {new Date(task.deadline).toLocaleDateString()}
                    </p>
                    <p className='text-green-600'>{message}</p>
</div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/task/${task.id}`}
                      className="p-2 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors duration-200"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    {task.status === 'Completed' && (
                      <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-success-600 dark:hover:text-success-400 hover:bg-success-50 dark:hover:bg-success-900/20 rounded-lg transition-colors duration-200">
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                    <p className='text-green-600'>{message}</p>
</div>
                  <p className='text-green-600'>{message}</p>
</div>
              </motion.div>
            ))}
            <p className='text-green-600'>{message}</p>
</div>

          {tasks.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2">
                No tasks yet
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Get started by submitting your first academic task
              </p>
              <Link
                to="/submit-task"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 font-semibold"
              >
                <Plus className="w-5 h-5 mr-2" />
                Submit Your First Task
              </Link>
              <p className='text-green-600'>{message}</p>
</div>
          )}
          <p className='text-green-600'>{message}</p>
</div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
              Quick Stats
            </h3>
            <p className='text-green-600'>{message}</p>
</div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Success Rate</span>
              <span className="font-medium text-slate-800 dark:text-white">98%</span>
              <p className='text-green-600'>{message}</p>
</div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Avg. Completion Time</span>
              <span className="font-medium text-slate-800 dark:text-white">3 days</span>
              <p className='text-green-600'>{message}</p>
</div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Satisfaction Score</span>
              <span className="font-medium text-slate-800 dark:text-white">4.9/5</span>
              <p className='text-green-600'>{message}</p>
</div>
            <p className='text-green-600'>{message}</p>
</div>
          <p className='text-green-600'>{message}</p>
</div>

        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
              Upcoming Deadlines
            </h3>
            <p className='text-green-600'>{message}</p>
</div>
          <div className="space-y-3">
            {tasks
              .filter(task => task.status !== 'Completed')
              .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
              .slice(0, 3)
              .map((task, index) => (
                <div key={task.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                      {task.title.length > 25 ? `${task.title.substring(0, 25)}...` : task.title}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {task.category}
                    </p>
                    <p className='text-green-600'>{message}</p>
</div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-800 dark:text-white">
                      {new Date(task.deadline).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {Math.ceil((new Date(task.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                    </p>
                    <p className='text-green-600'>{message}</p>
</div>
                  <p className='text-green-600'>{message}</p>
</div>
              ))}
            <p className='text-green-600'>{message}</p>
</div>
          <p className='text-green-600'>{message}</p>
</div>
      </motion.div>
      <p className='text-green-600'>{message}</p>
</div>
  );
};

export default Dashboard;