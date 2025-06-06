// components/MainClientApp.tsx
// This is a Client Component because it uses useState for currentPage.

// Assuming EditProfilePage and PaymentGatewayPage will also be converted to TypeScript
// and imported as .tsx files.

import { fetchUserById, createUser, updateUser } from "@/app/lib/utils"; // Mock API utilities
import UserForm from "@/app/components/userForm"; // The UserForm component
import { User } from "@/app/lib/types";
import styles from "@/app/styles/userDetail.module.css"; // Page-specific styles

interface UserDetailPageProps {
  params: {
    userId: string;
  };
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { userId } = params;
  let user: User | undefined = undefined;
  let error: string | null = null;
  const isNewUser = userId === "new";

  if (!isNewUser) {
    try {
      user = await fetchUserById(userId); // Fetch user on the server
      if (!user) {
        error = `User with ID "${userId}" not found.`;
      }
    } catch (err) {
      console.error(`Failed to fetch user ${userId}:`, err);
      error = "Failed to load user data. Please try again.";
    }
  }

  return (
    <div className={styles.container}>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {!error && (
        <UserForm
          initialUser={user} // Pass server-fetched data
          isNewUser={isNewUser} // Pass mode (new/edit)
          // onCreate and onUpdate props are removed here
        />
      )}
    </div>
  );
}
