type CollaboratorCursorProps = {
  color?: string;
  className?: string;
};

/**
 * Collaborator pointer traced from the reference silhouette.
 * Fill follows currentColor. The white outline is the path stroke.
 */
export function CollaboratorCursor({ color, className = "collab-pointer" }: CollaboratorCursorProps) {
  return (
    <svg
      viewBox="0 0 21.82 24"
      width="22"
      height="24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      style={color ? { color } : undefined}
    >
      <path
        d="M1.6 1.6 20.21 12.26 10.61 15.22 5.95 22.39Z"
        fill="currentColor"
        stroke="white"
        strokeWidth="2.88"
        strokeLinejoin="round"
        paintOrder="stroke fill"
      />
    </svg>
  );
}
