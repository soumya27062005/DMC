import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  FileText,
  Calendar,
  Clock,
  DollarSign,
  User,
  MessageCircle,
  Download,
  Eye,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Star
} from 'lucide-react';

interface TaskDetail {
  id: string;
  title: string;
  description: string;
  category: 'Assignment' | 'Project' | 'Research' | 'Presentation';
  status: 'Submitted' | 'In Progress' | 'Completed' | 'Revision';
  deadline: string;
  submittedAt: string;
  amount: number;
  pages: number;
  subject: string;
  urgency: 'Low' | 'Medium' | 'High';
  instructions: string;
  assignedTo?: string;
  completedAt?: string;
  files: Array<{ name: string; type: string; size: string; url: string }>;
  updates: Array<{
    id: string;
    message: string;
    timestamp: string;
    type: 'status' | 'comment' | 'file';
  }>;
}

const TaskDetails: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('details');

  // Mock data - in real app, this would come from API
  const task: TaskDetail = {
    id: id || '1',
    title: 'Database Management System Assignment',
    description: 'Create a comprehensive database design and implementation project focusing on normalization, indexing, and query optimization.',
    category: 'Assignment',
    status: 'In Progress',
    deadline: '2024-01-20',
    submittedAt: '2024-01-15',
    amount: 800,
    pages: 5,
    subject: 'Computer Science',
    urgency: 'Medium',
    instructions: 'Please follow the APA citation format and include at least 5 academic references. The database should be implemented using MySQL with sample data.',
    assignedTo: 'Dr. Sarah Johnson',
    files: [
      { name: 'requirements.pdf', type: 'PDF', size: '2.3 MB', url: '#' },
      { name: 'database_schema.sql', type: 'SQL', size: '1.1 MB', url: '#' },
    ],
    updates: [
      {
        id: '1',
        message: 'Task has been assigned to our expert team.',
        timestamp: '2024-01-15T10:30:00Z',
        type: 'status',
      },
      {
        id: '2',
        message: 'Initial database schema design completed. Proceeding with implementation.',
        timestamp: '2024-01-16T14:15:00Z',
        type: 'comment',
      },
      {
        id: '3',
        message: 'Status updated to In Progress',
        timestamp: '2024-01-16T14:16:00Z',
        type: 'status',
      },
    ],
  };

  const getStatusColor = (status: TaskDetail['status']) => {
    switch (status) {
      case 'Completed':
        return { bg: 'bg-success-100 dark:bg-success-900/20', text: 'text-success-800 dark:text-success-400', icon: CheckCircle };
      case 'In Progress':
        return { bg: 'bg-warning-100 dark:bg-warning-900/20', text: 'text-warning-800 dark:text-warning-400', icon: RefreshCw };
      case 'Submitted':
        return { bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-800 dark:text-blue-400', icon: Clock };
      case 'Revision':
        return { bg: 'bg-error-100 dark:bg-error-900/20', text: 'text-error-800 dark:text-error-400', icon: AlertCircle };
      default:
        return { bg: 'bg-slate-100 dark:bg-slate-700', text: 'text-slate-800 dark:text-slate-300', icon: FileText };
    }
  };

  const getUrgencyColor = (urgency: TaskDetail['urgency']) => {
    switch (urgency) {
      case 'High':
        return 'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-400';
      case 'Medium':
        return 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400';
      case 'Low':
        return 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  const statusColor = getStatusColor(task.status);
  const StatusIcon = statusColor.icon;

  const tabs = [
    { id: 'details', label: 'Task Details', icon: FileText },
    { id: 'updates', label: 'Updates', icon: MessageCircle },
    { id: 'files', label: 'Files', icon: Download },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4 mb-8"
      >
        <Link
          to="/dashboard"
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            {task.title}
          </h1>
          <div className="flex items-center space-x-4 mt-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColor.bg} ${statusColor.text}`}>
              <StatusIcon className="w-4 h-4 mr-1" />
              {task.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(task.urgency)}`}>
              {task.urgency} Priority
            </span>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/20 mb-8"
      >
        <div className="flex border-b border-slate-200 dark:border-slate-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-8">
          {/* Task Details Tab */}
          {activeTab === 'details' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Overview */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                      Task Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Category</span>
                        <span className="font-medium text-slate-800 dark:text-white">{task.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Subject</span>
                        <span className="font-medium text-slate-800 dark:text-white">{task.subject}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Pages</span>
                        <span className="font-medium text-slate-800 dark:text-white">{task.pages}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Amount</span>
                        <span className="font-medium text-slate-800 dark:text-white">₹{task.amount}</span>
                      </div>
                    </div>
                  </div>

                  {task.assignedTo && (
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                        Assigned Expert
                      </h3>
                      <div className="flex items-center space-x-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 dark:text-white">{task.assignedTo}</p>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">5.0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                      Timeline
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Submitted</p>
                          <p className="font-medium text-slate-800 dark:text-white">
                            {new Date(task.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Deadline</p>
                          <p className="font-medium text-slate-800 dark:text-white">
                            {new Date(task.deadline).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {task.completedAt && (
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-success-500" />
                          <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Completed</p>
                            <p className="font-medium text-slate-800 dark:text-white">
                              {new Date(task.completedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                      Progress
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Completion</span>
                        <span className="font-medium text-slate-800 dark:text-white">
                          {task.status === 'Completed' ? '100%' : task.status === 'In Progress' ? '60%' : '25%'}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: task.status === 'Completed' ? '100%' : task.status === 'In Progress' ? '60%' : '25%' 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                  Description
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {task.description}
                </p>
              </div>

              {/* Instructions */}
              {task.instructions && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                    Special Instructions
                  </h3>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <p className="text-blue-800 dark:text-blue-300">
                      {task.instructions}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Updates Tab */}
          {activeTab === 'updates' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                Task Updates
              </h3>
              <div className="space-y-4">
                {task.updates.map((update, index) => (
                  <div key={update.id} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                      {index < task.updates.length - 1 && (
                        <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mx-auto mt-2" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-800 dark:text-white">{update.message}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {new Date(update.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Files Tab */}
          {activeTab === 'files' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                Task Files
              </h3>
              <div className="space-y-4">
                {task.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-800 dark:text-white">{file.name}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {file.type} • {file.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-success-600 dark:hover:text-success-400 hover:bg-success-50 dark:hover:bg-success-900/20 rounded-lg transition-colors duration-200">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                
                {task.files.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">No files uploaded yet</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center space-x-4"
      >
        <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
          Contact Support
        </button>
        {task.status === 'Completed' && (
          <button className="px-6 py-3 bg-success-500 text-white rounded-xl hover:bg-success-600 transition-colors duration-200 font-semibold">
            Download Invoice
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default TaskDetails;