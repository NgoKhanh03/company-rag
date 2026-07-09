## Mục tiêu
Bổ sung 26 màn hình/chức năng UI (mock data, dark theme) vào dashboard Novadoc hiện tại, chia thành 6 nhóm. Toàn bộ dùng dữ liệu giả, không kết nối backend, giữ nguyên hệ thống i18n / sidebar / RTL đã có.

## Kiến trúc route

Tổ chức route dưới `src/routes/` (flat, dot-separated). Các trang authentication nằm ngoài `AppShell`; các trang còn lại dùng chung `AppShell`.

```text
src/routes/
  auth.login.tsx              /auth/login
  auth.register.tsx           /auth/register
  users.tsx                   /users            (User Management)
  users.$userId.tsx           /users/:userId    (User Profile - 4 tabs)
  departments.tsx             /departments
  roles.tsx                   /roles
  permissions.tsx             /permissions      (matrix + tree)
  workspaces.tsx              /workspaces
  workspaces.$id.tsx          /workspaces/:id   (4 tabs)
  settings.tsx                /settings         (layout w/ sidebar + Outlet)
  settings.index.tsx          /settings         → General
  settings.llm.tsx
  settings.embedding.tsx
  settings.agent.tsx
  settings.memory.tsx
  settings.compression.tsx
  settings.trimming.tsx
  monitoring.health.tsx       /monitoring/health
  monitoring.events.tsx       /monitoring/events
  backup.tsx                  /backup           (dashboard)
  backup.system-check.tsx
  backup.history.tsx
  backup.s3.tsx
  backup.tenants.tsx
```

Workspace Switcher, Backup Dialog, Restore Dialog, Permission Matrix drawer triển khai dạng component/dialog (không route riêng).

## Component dùng chung (mới)

Thêm dưới `src/components/`:
- `data-table.tsx` — bảng có search + filter + pagination mock
- `status-badge.tsx` — badge trạng thái (success/warning/error/info)
- `stat-card.tsx` — thẻ chỉ số dashboard
- `empty-state.tsx`
- `confirm-dialog.tsx`
- `workspace-switcher.tsx` — combobox trong AppShell header
- `backup-dialog.tsx`, `restore-dialog.tsx`
- `permission-matrix.tsx`, `permission-tree.tsx`
- `timeline-event.tsx` cho event log

Tận dụng tối đa shadcn có sẵn (Table, Tabs, Dialog, Drawer, Progress, Skeleton, Toast/Sonner, Tree qua Collapsible).

## Sidebar & Navigation

Mở rộng `app-sidebar.tsx` chia nhóm:
- Workspace: Overview, Chat, Library, Analytics, Notifications
- Administration: Users, Departments, Roles, Permissions, Workspaces
- System: Settings, Monitoring (Health / Events), Backup

Thêm `WorkspaceSwitcher` trong header của `AppShell`.

## i18n

Bổ sung khóa dịch mới cho toàn bộ nav + tiêu đề trang + label chính (nhóm keys: `auth.*`, `users.*`, `dept.*`, `role.*`, `perm.*`, `ws.*`, `settings.*`, `monitor.*`, `backup.*`, `common.*`). Ngôn ngữ chính điền đủ VI + EN; các ngôn ngữ còn lại fallback về EN cho khóa mới (giữ hành vi hiện tại).

## Trạng thái UI

Mỗi màn hình data-table mock có: loading skeleton (toggle demo), empty state khi filter rỗng, error boundary sẵn từ root, toast xác nhận hành động (Sonner). Backup/Restore có Progress giả lập bằng `setInterval`.

## Chi tiết kỹ thuật

- Auth pages: layout riêng (card giữa màn hình, gradient dark), không dùng `AppShell`. Login có "Sample accounts" là các nút điền sẵn form.
- User Profile: `Tabs` với 4 tab (General/Security/Permissions/Activity).
- Workspace Detail: `Tabs` với 4 tab (General/Members/Agents/Settings).
- Settings: `settings.tsx` là layout route trả về `<Outlet />` bên trong sidebar-in-page.
- Permission Management: 2 view toggle — Matrix (`<Table>` role × permission với `<Checkbox>`) và Tree (`<Collapsible>` lồng nhau).
- Health Check: grid `StatCard` cho API/DB/Queue/Storage/LLM/CPU/Memory/Disk + nút Refresh (spin icon 1s).
- Event Log: toolbar (Live/Pause/Clear/Filter), timeline scroll, click row mở `<Sheet>` drawer chi tiết.
- Backup Dashboard: 5 card lớn dẫn tới các trang con + dialog.
- S3 Storage: form + "Test Connection" trả toast giả.
- Tenant Backup: bảng chọn nhiều tenant + nút Backup Selected.

## Phạm vi KHÔNG làm
- Không thêm backend, database, Lovable Cloud.
- Không thay đổi logic i18n/RTL/sidebar đã fix.
- Không đụng route hiện tại (`/`, `/chat`, `/documents`, `/analytics`, `/notifications`).

## Thứ tự triển khai
1. Component dùng chung (data-table, stat-card, status-badge, empty-state, workspace-switcher).
2. Mở rộng sidebar + i18n keys.
3. Auth (login/register) với layout riêng.
4. User & RBAC (5 màn).
5. Workspace (2 route + switcher).
6. Settings (layout + 7 tab).
7. Monitoring (2 màn).
8. Backup & Restore (5 route + 2 dialog).
9. Verify build + Playwright smoke test 1 vài route chính.
