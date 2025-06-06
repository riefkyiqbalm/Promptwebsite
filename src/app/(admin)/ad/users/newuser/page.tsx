// components/MainClientApp.tsx
// This is a Client Component because it uses useState for currentPage.

// Assuming EditProfilePage and PaymentGatewayPage will also be converted to TypeScript
// and imported as .tsx files.

import UserForm from "@/app/components/userForm"; // The UserForm component

import styles from "@/app/styles/userDetail.module.css"; // Page-specific styles

export default async function UserDetailPage() {
  return (
    <div className={styles.container}>
      <UserForm
        initialUser={undefined} // No initial user data for new user
        isNewUser={true}
      ></UserForm>
    </div>
  );
}
