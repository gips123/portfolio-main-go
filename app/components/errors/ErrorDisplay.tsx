"use client";

import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { APIError } from "../../lib/utils/errors";
import Link from "next/link";

interface ErrorDisplayProps {
  error: APIError | Error;
  onRetry?: () => void;
  showHomeButton?: boolean;
}

export default function ErrorDisplay({ error, onRetry, showHomeButton = true }: ErrorDisplayProps) {
  const apiError = error instanceof APIError ? error : null;
  const statusCode = apiError?.statusCode || 0;

  // Simple public-friendly messages based on status code
  const getPublicMessage = () => {
    if (!apiError) {
      return "Maaf, terjadi kesalahan. Silakan coba lagi nanti.";
    }

    switch (statusCode) {
      case 400:
        return "Permintaan tidak valid. Silakan coba lagi.";
      case 401:
        return "Akses ditolak. Silakan coba lagi nanti.";
      case 403:
        return "Akses tidak diizinkan.";
      case 404:
        return "Halaman atau data yang Anda cari tidak ditemukan.";
      case 500:
      case 502:
      case 503:
      case 504:
        return "Server sedang mengalami masalah. Silakan coba lagi nanti.";
      default:
        if (apiError.isNetworkError()) {
          return "Tidak dapat terhubung ke server. Silakan periksa koneksi internet Anda.";
        }
        return "Maaf, terjadi kesalahan. Silakan coba lagi nanti.";
    }
  };

  const getErrorColor = () => {
    if (!apiError) return 'text-yellow-400';
    if (apiError.isClientError()) return 'text-yellow-400';
    if (apiError.isServerError()) return 'text-red-400';
    if (apiError.isNetworkError()) return 'text-orange-400';
    return 'text-yellow-400';
  };

  const getBorderColor = () => {
    if (!apiError) return 'border-yellow-400/30';
    if (apiError.isClientError()) return 'border-yellow-400/30';
    if (apiError.isServerError()) return 'border-red-400/30';
    if (apiError.isNetworkError()) return 'border-orange-400/30';
    return 'border-yellow-400/30';
  };

  return (
    <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 md:p-12">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 opacity-50"></div>
      
      <div className="relative z-10 text-center">
        <div className="flex justify-center mb-6">
          <div className={`w-20 h-20 rounded-full ${getBorderColor()} border-2 flex items-center justify-center bg-white/5`}>
            <AlertCircle className={`w-10 h-10 ${getErrorColor()}`} />
          </div>
        </div>

        {statusCode > 0 && (
          <div className={`inline-block px-4 py-2 rounded-lg bg-white/10 border ${getBorderColor()} mb-4`}>
            <span className={`text-2xl font-bold ${getErrorColor()}`}>{statusCode}</span>
          </div>
        )}

        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-white">
          Oops! Terjadi Kesalahan
        </h2>

        <p className="text-white/80 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
          {getPublicMessage()}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="group relative backdrop-blur-xl bg-white/20 border border-white/30 rounded-lg px-6 py-3 text-white font-medium hover:bg-white/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              Coba Lagi
            </button>
          )}

          {showHomeButton && (
            <Link
              href="/"
              className="group relative backdrop-blur-xl bg-white/20 border border-white/30 rounded-lg px-6 py-3 text-white font-medium hover:bg-white/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Kembali ke Beranda
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

