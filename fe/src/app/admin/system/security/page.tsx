'use client'

import { useState } from 'react'
import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { DataTable } from '@/shared/ui/DataTable'
import Modal from '@/shared/ui/Modal'

interface LoginAttempt extends Record<string, unknown> {
  id: string
  username: string
  email: string
  ipAddress: string
  userAgent: string
  status: 'SUCCESS' | 'FAILED' | 'BLOCKED'
  timestamp: string
  location?: string
}

interface ActiveSession extends Record<string, unknown> {
  id: string
  userId: string
  username: string
  email: string
  ipAddress: string
  device: string
  browser: string
  loginTime: string
  lastActivity: string
  isCurrentSession: boolean
}

interface SecurityLog extends Record<string, unknown> {
  id: string
  type: 'LOGIN' | 'LOGOUT' | 'PASSWORD_CHANGE' | 'PERMISSION_CHANGE' | 'API_ACCESS'
  userId: string
  username: string
  description: string
  timestamp: string
  severity: 'INFO' | 'WARNING' | 'CRITICAL'
}

const statusColors = {
  SUCCESS: 'bg-green-100 text-green-800',
  FAILED: 'bg-red-100 text-red-800',
  BLOCKED: 'bg-gray-100 text-gray-800',
}

const statusLabels = {
  SUCCESS: 'Thành công',
  FAILED: 'Thất bại',
  BLOCKED: 'Bị chặn',
}

const severityColors = {
  INFO: 'bg-blue-100 text-blue-800',
  WARNING: 'bg-yellow-100 text-yellow-800',
  CRITICAL: 'bg-red-100 text-red-800',
}

const severityLabels = {
  INFO: 'Thông tin',
  WARNING: 'Cảnh báo',
  CRITICAL: 'Nghiêm trọng',
}

const logTypeLabels = {
  LOGIN: 'Đăng nhập',
  LOGOUT: 'Đăng xuất',
  PASSWORD_CHANGE: 'Đổi mật khẩu',
  PERMISSION_CHANGE: 'Thay đổi quyền',
  API_ACCESS: 'Truy cập API',
}

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState<'attempts' | 'sessions' | 'logs' | 'settings'>('attempts')
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<ActiveSession | null>(null)

  // Mock data - Login Attempts
  const loginAttempts: LoginAttempt[] = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@bhx.vn',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome 120.0 on Windows',
      status: 'SUCCESS',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      location: 'Ho Chi Minh City, Vietnam',
    },
    {
      id: '2',
      username: 'admin',
      email: 'admin@bhx.vn',
      ipAddress: '103.45.67.89',
      userAgent: 'Firefox 121.0 on Windows',
      status: 'FAILED',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      location: 'Hanoi, Vietnam',
    },
    {
      id: '3',
      username: 'hacker123',
      email: 'unknown@example.com',
      ipAddress: '45.123.45.67',
      userAgent: 'Python/3.9',
      status: 'BLOCKED',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      location: 'Unknown',
    },
    {
      id: '4',
      username: 'staff01',
      email: 'staff01@bhx.vn',
      ipAddress: '192.168.1.105',
      userAgent: 'Chrome 120.0 on macOS',
      status: 'SUCCESS',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      location: 'Ho Chi Minh City, Vietnam',
    },
  ]

  // Mock data - Active Sessions
  const activeSessions: ActiveSession[] = [
    {
      id: 'sess-1',
      userId: 'user-1',
      username: 'admin',
      email: 'admin@bhx.vn',
      ipAddress: '192.168.1.100',
      device: 'Desktop',
      browser: 'Chrome 120.0',
      loginTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      lastActivity: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      isCurrentSession: true,
    },
    {
      id: 'sess-2',
      userId: 'user-1',
      username: 'admin',
      email: 'admin@bhx.vn',
      ipAddress: '192.168.1.101',
      device: 'Mobile',
      browser: 'Safari iOS',
      loginTime: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      lastActivity: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      isCurrentSession: false,
    },
    {
      id: 'sess-3',
      userId: 'user-2',
      username: 'staff01',
      email: 'staff01@bhx.vn',
      ipAddress: '192.168.1.105',
      device: 'Desktop',
      browser: 'Firefox 121.0',
      loginTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      lastActivity: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      isCurrentSession: false,
    },
  ]

  // Mock data - Security Logs
  const securityLogs: SecurityLog[] = [
    {
      id: 'log-1',
      type: 'LOGIN',
      userId: 'user-1',
      username: 'admin',
      description: 'Đăng nhập thành công từ IP 192.168.1.100',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      severity: 'INFO',
    },
    {
      id: 'log-2',
      type: 'PASSWORD_CHANGE',
      userId: 'user-2',
      username: 'staff01',
      description: 'Thay đổi mật khẩu thành công',
      timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
      severity: 'WARNING',
    },
    {
      id: 'log-3',
      type: 'LOGIN',
      userId: 'unknown',
      username: 'hacker123',
      description: 'Đăng nhập thất bại - IP bị chặn sau 5 lần thử',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      severity: 'CRITICAL',
    },
    {
      id: 'log-4',
      type: 'PERMISSION_CHANGE',
      userId: 'user-1',
      username: 'admin',
      description: 'Cấp quyền PRODUCT_WRITE cho user staff02',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      severity: 'WARNING',
    },
  ]

  const handleRevokeSession = (session: ActiveSession) => {
    setSelectedSession(session)
    setIsRevokeModalOpen(true)
  }

  const confirmRevoke = () => {
    alert(`Đã thu hồi phiên đăng nhập của ${selectedSession?.username}`)
    setIsRevokeModalOpen(false)
    setSelectedSession(null)
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('vi-VN')
  }

  const formatTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    
    if (minutes < 1) return 'Vừa xong'
    if (minutes < 60) return `${minutes} phút trước`
    if (hours < 24) return `${hours} giờ trước`
    return `${Math.floor(hours / 24)} ngày trước`
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Security"
        subtitle="Quản lý bảo mật, phiên đăng nhập và nhật ký hệ thống"
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'System', href: '/admin/system' },
          { label: 'Security', href: '/admin/system/security' },
        ]}
        actions={
          <Button onClick={() => alert('Export security report')}>
            📄 Export Report
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card p-4 border-l-4 border-green-500">
          <div className="text-sm text-gray-600 mb-1">Đăng nhập thành công</div>
          <div className="text-2xl font-bold text-green-600">
            {loginAttempts.filter((a) => a.status === 'SUCCESS').length}
          </div>
          <div className="text-xs text-gray-500 mt-1">24 giờ qua</div>
        </div>

        <div className="card p-4 border-l-4 border-red-500">
          <div className="text-sm text-gray-600 mb-1">Thất bại/Bị chặn</div>
          <div className="text-2xl font-bold text-red-600">
            {loginAttempts.filter((a) => a.status !== 'SUCCESS').length}
          </div>
          <div className="text-xs text-gray-500 mt-1">Cần chú ý</div>
        </div>

        <div className="card p-4 border-l-4 border-blue-500">
          <div className="text-sm text-gray-600 mb-1">Phiên hoạt động</div>
          <div className="text-2xl font-bold text-blue-600">{activeSessions.length}</div>
          <div className="text-xs text-gray-500 mt-1">Users đang online</div>
        </div>

        <div className="card p-4 border-l-4 border-yellow-500">
          <div className="text-sm text-gray-600 mb-1">Cảnh báo bảo mật</div>
          <div className="text-2xl font-bold text-yellow-600">
            {securityLogs.filter((l) => l.severity !== 'INFO').length}
          </div>
          <div className="text-xs text-gray-500 mt-1">Cần xem xét</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: 'attempts', label: 'Lịch sử đăng nhập', icon: '🔐' },
              { id: 'sessions', label: 'Phiên hoạt động', icon: '👥' },
              { id: 'logs', label: 'Nhật ký bảo mật', icon: '📋' },
              { id: 'settings', label: 'Cài đặt', icon: '⚙️' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'attempts' && (
        <div className="card">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Lịch sử đăng nhập</h3>
            <p className="text-sm text-gray-600">Theo dõi các lần thử đăng nhập vào hệ thống</p>
          </div>

          <DataTable
            data={loginAttempts}
            columns={[
              {
                key: 'timestamp',
                label: 'Thời gian',
                render: (v) => (
                  <div>
                    <div className="text-sm text-gray-900">{formatTimestamp(v as string)}</div>
                    <div className="text-xs text-gray-500">{formatTimeAgo(v as string)}</div>
                  </div>
                ),
              },
              {
                key: 'username',
                label: 'Người dùng',
                render: (v, item) => {
                  const attempt = item as LoginAttempt
                  return (
                    <div>
                      <div className="font-medium text-gray-900">{v as string}</div>
                      <div className="text-xs text-gray-500">{attempt.email}</div>
                    </div>
                  )
                },
              },
              {
                key: 'ipAddress',
                label: 'IP Address',
                render: (v, item) => {
                  const attempt = item as LoginAttempt
                  return (
                    <div>
                      <div className="font-mono text-sm text-gray-900">{v as string}</div>
                      <div className="text-xs text-gray-500">{attempt.location || 'Unknown'}</div>
                    </div>
                  )
                },
              },
              {
                key: 'userAgent',
                label: 'Device',
                render: (v) => <span className="text-sm text-gray-700">{v as string}</span>,
              },
              {
                key: 'status',
                label: 'Trạng thái',
                render: (v) => {
                  const status = v as 'SUCCESS' | 'FAILED' | 'BLOCKED'
                  return (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
                      {statusLabels[status]}
                    </span>
                  )
                },
              },
            ]}
          />
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="card">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Phiên đăng nhập đang hoạt động</h3>
            <p className="text-sm text-gray-600">Quản lý các phiên đăng nhập hiện tại</p>
          </div>

          <DataTable
            data={activeSessions}
            columns={[
              {
                key: 'username',
                label: 'Người dùng',
                render: (v, item) => {
                  const session = item as ActiveSession
                  return (
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{v as string}</span>
                        {session.isCurrentSession && (
                          <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                            Phiên hiện tại
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">{session.email}</div>
                    </div>
                  )
                },
              },
              {
                key: 'device',
                label: 'Thiết bị',
                render: (v, item) => {
                  const session = item as ActiveSession
                  return (
                    <div>
                      <div className="text-sm text-gray-900">{v as string}</div>
                      <div className="text-xs text-gray-500">{session.browser}</div>
                    </div>
                  )
                },
              },
              {
                key: 'ipAddress',
                label: 'IP Address',
                render: (v) => <span className="font-mono text-sm text-gray-900">{v as string}</span>,
              },
              {
                key: 'loginTime',
                label: 'Đăng nhập lúc',
                render: (v) => (
                  <div className="text-sm text-gray-700">{formatTimestamp(v as string)}</div>
                ),
              },
              {
                key: 'lastActivity',
                label: 'Hoạt động gần nhất',
                render: (v) => (
                  <div className="text-sm text-gray-700">{formatTimeAgo(v as string)}</div>
                ),
              },
              {
                key: 'id',
                label: 'Hành động',
                render: (_v, item) => {
                  const session = item as ActiveSession
                  return (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRevokeSession(session)}
                      disabled={session.isCurrentSession}
                      className="text-red-600 hover:bg-red-50"
                    >
                      {session.isCurrentSession ? 'Phiên hiện tại' : 'Thu hồi'}
                    </Button>
                  )
                },
              },
            ]}
          />
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="card">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Nhật ký bảo mật</h3>
            <p className="text-sm text-gray-600">Ghi lại các sự kiện quan trọng về bảo mật</p>
          </div>

          <DataTable
            data={securityLogs}
            columns={[
              {
                key: 'timestamp',
                label: 'Thời gian',
                render: (v) => (
                  <div>
                    <div className="text-sm text-gray-900">{formatTimestamp(v as string)}</div>
                    <div className="text-xs text-gray-500">{formatTimeAgo(v as string)}</div>
                  </div>
                ),
              },
              {
                key: 'type',
                label: 'Loại',
                render: (v) => {
                  const type = v as keyof typeof logTypeLabels
                  return (
                    <span className="text-sm font-medium text-gray-900">{logTypeLabels[type]}</span>
                  )
                },
              },
              {
                key: 'username',
                label: 'Người dùng',
                render: (v) => <span className="font-medium text-gray-900">{v as string}</span>,
              },
              {
                key: 'description',
                label: 'Mô tả',
                render: (v) => <span className="text-sm text-gray-700">{v as string}</span>,
              },
              {
                key: 'severity',
                label: 'Mức độ',
                render: (v) => {
                  const severity = v as 'INFO' | 'WARNING' | 'CRITICAL'
                  return (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${severityColors[severity]}`}>
                      {severityLabels[severity]}
                    </span>
                  )
                },
              },
            ]}
          />
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Chính sách mật khẩu</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <div className="font-medium text-gray-900">Độ dài tối thiểu</div>
                  <div className="text-sm text-gray-600">Số ký tự tối thiểu cho mật khẩu</div>
                </div>
                <Input type="number" value={8} className="w-24" />
              </div>

              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <div className="font-medium text-gray-900">Yêu cầu chữ hoa</div>
                  <div className="text-sm text-gray-600">Mật khẩu phải có ít nhất 1 chữ hoa</div>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <div className="font-medium text-gray-900">Yêu cầu ký tự đặc biệt</div>
                  <div className="text-sm text-gray-600">Mật khẩu phải có ký tự đặc biệt</div>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium text-gray-900">Hết hạn sau</div>
                  <div className="text-sm text-gray-600">Mật khẩu hết hạn sau số ngày</div>
                </div>
                <Input type="number" value={90} className="w-24" />
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Kiểm soát đăng nhập</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <div className="font-medium text-gray-900">Số lần thử tối đa</div>
                  <div className="text-sm text-gray-600">Chặn sau bao nhiêu lần thử sai</div>
                </div>
                <Input type="number" value={5} className="w-24" />
              </div>

              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <div className="font-medium text-gray-900">Thời gian khóa</div>
                  <div className="text-sm text-gray-600">Khóa tài khoản trong bao lâu (phút)</div>
                </div>
                <Input type="number" value={30} className="w-24" />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium text-gray-900">Xác thực 2 yếu tố (2FA)</div>
                  <div className="text-sm text-gray-600">Bắt buộc 2FA cho tất cả admin</div>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button>💾 Lưu cài đặt</Button>
          </div>
        </div>
      )}

      {/* Revoke Session Modal */}
      <Modal
        isOpen={isRevokeModalOpen}
        onClose={() => setIsRevokeModalOpen(false)}
        title="Thu hồi phiên đăng nhập"
        size="md"
      >
        {selectedSession && (
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Bạn có chắc chắn muốn thu hồi phiên đăng nhập này? Người dùng sẽ bị đăng xuất
                ngay lập tức.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-gray-600">Người dùng:</span>
                <span className="ml-2 font-medium text-gray-900">{selectedSession.username}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 text-gray-900">{selectedSession.email}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">IP:</span>
                <span className="ml-2 font-mono text-gray-900">{selectedSession.ipAddress}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Thiết bị:</span>
                <span className="ml-2 text-gray-900">
                  {selectedSession.device} - {selectedSession.browser}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="secondary" onClick={() => setIsRevokeModalOpen(false)}>
                Hủy
              </Button>
              <Button onClick={confirmRevoke} className="bg-red-600 hover:bg-red-700">
                Thu hồi phiên
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
