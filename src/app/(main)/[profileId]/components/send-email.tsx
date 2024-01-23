type SendEmailType = {
  hireEmail: string;
};

export default function SendEmail({ hireEmail }: SendEmailType) {
  return (
    <div>
      <p className="font-medium">{hireEmail}</p>
    </div>
  );
}
