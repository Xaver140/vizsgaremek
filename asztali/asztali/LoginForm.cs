namespace asztali
{
    public partial class LoginForm : Form
    {
        private readonly ApiClient _api;

        public LoginForm()
        {

            InitializeComponent();
            _api = new ApiClient("http://localhost:3000");
        }

        private async void btnLogin_Click(object sender, EventArgs e)
        {
            btnLogin.Enabled = false;

            try
            {
                MessageBox.Show("CLICK OK");

                var req = new LoginReq
                {
                    email = txtEmail.Text.Trim(),
                    password = txtPassword.Text
                };

                MessageBox.Show("Küldöm a kérést...");

                var res = await _api.PostAsync<LoginReq, LoginRes>("/auth/login", req);

                MessageBox.Show("Válasz megjött.");

                MessageBox.Show("TOKEN: " + (res?.token ?? "NULL"));
            }
            catch (Exception ex)
            {
                MessageBox.Show("HIBA: " + ex.Message);
            }
            finally
            {
                btnLogin.Enabled = true;
            }
        }
    }

}
