import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { verifyEmail } from '../services/auth/authService';

const ConfirmPage = () => {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState<string>('Đang xác minh...');
    const [success, setSuccess] = useState<boolean | null>(null);
    const redirectLink = 'audivia://open';

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            setSuccess(false);
            setMessage('Thiếu mã xác thực!');
            return;
        }

        const confirm = async () => {
            try {
                const res = await verifyEmail(token);
                setSuccess(res.isSuccess);
                setMessage(res.message);
            } catch (error) {
                setSuccess(false);
                setMessage('Đã có lỗi xảy ra trong quá trình xác thực. Quý khách vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ.');
            }
        };

        // Adding a small delay for better user experience
        const timer = setTimeout(() => {
            confirm();
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchParams]);

    const isLoading = success === null;

    const renderIcon = () => {
        if (isLoading) {
            return (
                <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-t-transparent border-gray-300 rounded-full animate-spin" />
                    <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-t-blue-500 border-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                </div>
            );
        }
        if (success) {
            return (
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full bg-green-100 border-2 border-green-200 text-green-600 shadow-lg">
                    <svg className="w-10 h-10 sm:w-14 sm:h-14" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            );
        }
        return (
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full bg-red-100 border-2 border-red-200 text-red-600 shadow-lg">
                <svg className="w-10 h-10 sm:w-14 sm:h-14" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-48 h-48 sm:w-96 sm:h-96 bg-purple-200/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-64 sm:h-64 bg-indigo-200/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg">
                {/* Glass morphism card */}
                <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-6 sm:space-y-8">
                    {/* Logo area */}
                    <div className="text-center">
                        <div className="inline-flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                            <span className="text-xl sm:text-2xl font-bold text-green">Audivia</span>
                        </div>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center">{renderIcon()}</div>

                    {/* Content */}
                    <div className="text-center space-y-3 sm:space-y-4">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            {isLoading ? 'Đang xử lý...' : success ? 'Xác nhận thành công!' : 'Xác nhận thất bại'}
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed px-2">{message}</p>
                    </div>

                    {/* Action button */}
                    {success && (
                        <div className="pt-2 sm:pt-4">
                            <a
                                href={redirectLink}
                                className="group w-full flex items-center justify-center py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                            >
                                <span>Quay lại ứng dụng</span>
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </a>
                        </div>
                    )}
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-8 h-8 sm:w-12 sm:h-12 bg-blue-200/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-purple-200/30 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 text-center mt-8 sm:mt-12 text-gray-500">
                <p className="text-xs sm:text-sm">
                    &copy; {new Date().getFullYear()} Audivia. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default ConfirmPage;