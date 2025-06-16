import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Download,
  Plus,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface Task {
  id: string;
  title: string;
  student: string;
  category: 'Assignment' | 'Project' | 'Research' | 'Presentation';
  status: 'Submitted' | 'In Progress' | 'Completed' | 'Revision';
  amount: number;
  deadline: string;
  submittedAt: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  college: string;
  totalTasks: number;
  totalSpent: number;
  joinedAt: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Database Management System Assignment',
      student: 'John Doe',
      category: 'Assignment',
      status: 'In Progress',
      amount: 800,
      deadline: '2024-01-20',
      submittedAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'React.js E-commerce Project',
      student: 'Jane Smith',
      category: 'Project',
      status: 'Completed',
      amount: 1200,
      deadline: '2024-01-18',
      submittedAt: '2024-01-12',
    },
    {
      id: '3',
      title: 'Machine Learning Research Paper',
      student: 'Mike Johnson',
      category: 'Research',
      status: 'Submitted',
      amount: 1000,
      deadline: '2024-01-25',
      submittedAt: '2024-01-16',
    },
  ];

  const students: Student[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      college: 'Delhi University',
      totalTasks: 5,
      totalSpent: 4000,
      joinedAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      college: 'Mumbai University',
      totalTasks: 3,
      totalSpent: 2400,
      joinedAt: '2024-01-05',
    },
  ];

  const stats = [
    {
      title: 'Total Students',
      value: '156',
      change: '+12%',
      icon: Users,
      color: 'from-blue-500 to-purple-500',
    },
    {
      title: 'Active Tasks',
      value: '23',
      change: '+8%',
      icon: FileText,
      color: 'from-green-500 to-teal-500',
    },
    {
      title: 'Monthly Revenue',
      value: '₹45,600',
      change: '+15%',
      icon: DollarSign,
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Success Rate',
      value: '98%',
      change: '+2%',
      icon: TrendingUp,
      color: 'from-pink-500 to-purple-500',
    },
  ];

  const chartData = [
    { name: 'Jan', tasks: 12, revenue: 15000 },
    { name: 'Feb', tasks: 19, revenue: 23000 },
    { name: 'Mar', tasks: 15, revenue: 18000 },
    { name: 'Apr', tasks: 25, revenue: 32000 },
    { name: 'May', tasks: 22, revenue: 28000 },
    { name: 'Jun', tasks: 30, revenue: 38000 },
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

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    // In real app, this would make an API call
    console.log(`Updating task ${taskId} to ${newStatus}`);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.student.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'tasks', label: 'Tasks', icon: FileText },
    { id: 'students', label: 'Students', icon: Users },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage tasks, students, and monitor platform performance
          </p>
        </div>
        <button className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
          <Plus className="w-5 h-5 mr-2" />
          Add New Task
        </button>
      </motion.div>

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
                </div>
              </div>
              <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/20"
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
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                    Tasks Overview
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="tasks" fill="#8B5CF6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                    Revenue Trend
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#EC4899" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-6">
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Task Status</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Completed</span>
                      <span className="font-medium text-success-600 dark:text-success-400">65%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">In Progress</span>
                      <span className="font-medium text-warning-600 dark:text-warning-400">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Submitted</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">10%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-6">
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Top Categories</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Assignments</span>
                      <span className="font-medium text-slate-800 dark:text-white">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Projects</span>
                      <span className="font-medium text-slate-800 dark:text-white">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Research</span>
                      <span className="font-medium text-slate-800 dark:text-white">25%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-6">
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Quick Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors duration-200">
                      Export Reports
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors duration-200">
                      Send Notifications
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors duration-200">
                      Manage Users
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Filters */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="Submitted">Submitted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Revision">Revision</option>
                  </select>
                </div>
                <button className="inline-flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>

              {/* Tasks Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Task</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Student</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Deadline</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task, index) => (
                      <motion.tr
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                      >
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-slate-800 dark:text-white">{task.title}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Submitted {new Date(task.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-slate-800 dark:text-white">{task.student}</td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400">
                            {task.category}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={task.status}
                            onChange={(e) => updateTaskStatus(task.id, e.target.value as Task['status'])}
                            className={`px-2 py-1 text-xs rounded-full border-0 ${getStatusColor(task.status)}`}
                          >
                            <option value="Submitted">Submitted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Revision">Revision</option>
                          </select>
                        </td>
                        <td className="py-4 px-4 font-medium text-slate-800 dark:text-white">₹{task.amount}</td>
                        <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                          {new Date(task.deadline).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button className="p-1 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-slate-600 dark:text-slate-400 hover:text-warning-600 dark:hover:text-warning-400">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-slate-600 dark:text-slate-400 hover:text-error-600 dark:hover:text-error-400">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                  Registered Students
                </h3>
                <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200">
                  Add Student
                </button>
              </div>

              <div className="grid gap-6">
                {students.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-white">{student.name}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{student.email}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{student.college}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-slate-600 dark:text-slate-400">Tasks</p>
                            <p className="font-medium text-slate-800 dark:text-white">{student.totalTasks}</p>
                          </div>
                          <div>
                            <p className="text-slate-600 dark:text-slate-400">Spent</p>
                            <p className="font-medium text-slate-800 dark:text-white">₹{student.totalSpent}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;