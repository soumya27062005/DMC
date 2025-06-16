import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  FileText, 
  Upload, 
  Calendar, 
  DollarSign, 
  CreditCard,
  Smartphone,
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

interface TaskFormData {
  title: string;
  description: string;
  category: 'Assignment' | 'Project' | 'Research' | 'Presentation';
  deadline: string;
  urgency: 'Low' | 'Medium' | 'High';
  pages: number;
  subject: string;
  instructions: string;
}

const SubmitTask: React.FC = () => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<'gpay' | 'phonepe' | 'paytm' | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TaskFormData>();

  const formData = watch();

  const calculatePrice = () => {
    const basePrice = 100;
    const categoryMultiplier = {
      Assignment: 1,
      Project: 2.5,
      Research: 2,
      Presentation: 1.5,
    };
    const urgencyMultiplier = { Low: 1, Medium: 1.3, High: 1.6 };
    const pages = formData.pages || 1;
    
    return Math.round(
      basePrice * 
      categoryMultiplier[formData.category || 'Assignment'] * 
      urgencyMultiplier[formData.urgency || 'Low'] * 
      pages
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...uploadedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: TaskFormData) => {
    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(3);
      return;
    }

    // Step 3: Process payment and submit
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Task submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to submit task. Please try again.');
    }
  };

  const paymentMethods = [
    { id: 'gpay', name: 'Google Pay', icon: '🟢', color: 'from-green-500 to-green-600' },
    { id: 'phonepe', name: 'PhonePe', icon: '🟣', color: 'from-purple-500 to-purple-600' },
    { id: 'paytm', name: 'Paytm', icon: '🔵', color: 'from-blue-500 to-blue-600' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Step {step} of 3
          </span>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {step === 1 ? 'Task Details' : step === 2 ? 'Files & Instructions' : 'Payment'}
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
            initial={{ width: '33.33%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Step 1: Task Details */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-slate-700/20">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Task Details
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Task Title
                  </label>
                  <input
                    {...register('title', { required: 'Title is required' })}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter a descriptive title for your task"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-error-600">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Category
                  </label>
                  <select
                    {...register('category', { required: 'Category is required' })}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select category</option>
                    <option value="Assignment">Assignment</option>
                    <option value="Project">Project</option>
                    <option value="Research">Research</option>
                    <option value="Presentation">Presentation</option>
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-error-600">{errors.category.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Subject
                  </label>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., Computer Science, Mathematics"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-error-600">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Deadline
                  </label>
                  <input
                    {...register('deadline', { required: 'Deadline is required' })}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                  {errors.deadline && (
                    <p className="mt-1 text-sm text-error-600">{errors.deadline.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Urgency
                  </label>
                  <select
                    {...register('urgency', { required: 'Urgency is required' })}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select urgency</option>
                    <option value="Low">Low (7+ days)</option>
                    <option value="Medium">Medium (3-7 days)</option>
                    <option value="High">High (1-3 days)</option>
                  </select>
                  {errors.urgency && (
                    <p className="mt-1 text-sm text-error-600">{errors.urgency.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Number of Pages
                  </label>
                  <input
                    {...register('pages', { 
                      required: 'Number of pages is required',
                      min: { value: 1, message: 'Minimum 1 page required' }
                    })}
                    type="number"
                    min="1"
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter number of pages"
                  />
                  {errors.pages && (
                    <p className="mt-1 text-sm text-error-600">{errors.pages.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    {...register('description', { required: 'Description is required' })}
                    rows={4}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Provide a detailed description of your requirements"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-error-600">{errors.description.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Price Estimate */}
            {formData.category && formData.urgency && formData.pages && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Estimated Price</h3>
                    <p className="opacity-90">Based on your requirements</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">₹{calculatePrice()}</div>
                    <p className="opacity-90">Final amount</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Step 2: Files & Instructions */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-slate-700/20">
              <div className="flex items-center space-x-3 mb-6">
                <Upload className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Files & Additional Instructions
                </h2>
              </div>

              <div className="space-y-6">
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Upload Files (Optional)
                  </label>
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center hover:border-primary-400 transition-colors duration-200">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400 mb-2">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">
                      Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB each)
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors duration-200 cursor-pointer"
                    >
                      Choose Files
                    </label>
                  </div>

                  {/* Uploaded Files */}
                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Uploaded Files:
                      </p>
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-4 h-4 text-slate-500" />
                            <span className="text-sm text-slate-700 dark:text-slate-300">
                              {file.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-error-500 hover:text-error-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Additional Instructions */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Additional Instructions
                  </label>
                  <textarea
                    {...register('instructions')}
                    rows={6}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Provide any specific requirements, formatting guidelines, references, or special instructions..."
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-slate-700/20">
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Payment Details
                </h2>
              </div>

              {/* Order Summary */}
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Task</span>
                    <span className="font-medium text-slate-800 dark:text-white">{formData.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Category</span>
                    <span className="font-medium text-slate-800 dark:text-white">{formData.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Pages</span>
                    <span className="font-medium text-slate-800 dark:text-white">{formData.pages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Urgency</span>
                    <span className="font-medium text-slate-800 dark:text-white">{formData.urgency}</span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-600 pt-3 mt-3">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-slate-800 dark:text-white">Total Amount</span>
                      <span className="font-bold text-slate-800 dark:text-white">₹{calculatePrice()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                  Choose Payment Method
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {paymentMethods.map((method) => (
                    <motion.button
                      key={method.id}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPayment(method.id as any)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedPayment === method.id
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-3">
                        <span className="text-2xl">{method.icon}</span>
                        <div>
                          <p className="font-medium text-slate-800 dark:text-white">
                            {method.name}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Pay with UPI
                          </p>
                        </div>
                        {selectedPayment === method.id && (
                          <Check className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Payment Security Notice */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                      Secure Payment
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      Your payment is secured with bank-level encryption. We don't store your payment information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200"
            >
              Previous
            </button>
          )}
          
          <button
            type="submit"
            disabled={step === 3 && !selectedPayment}
            className="ml-auto px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 3 ? 'Submit & Pay' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitTask;