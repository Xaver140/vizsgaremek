namespace asztali
{
    partial class LoginForm
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            txtPassword = new TextBox();
            txtEmail = new TextBox();
            btnLogin = new Button();
            btnGoMain = new Button();
            SuspendLayout();
            // 
            // txtPassword
            // 
            txtPassword.Location = new Point(50, 130);
            txtPassword.Name = "txtPassword";
            txtPassword.Size = new Size(104, 23);
            txtPassword.TabIndex = 0;
            txtPassword.UseSystemPasswordChar = true;
            // 
            // txtEmail
            // 
            txtEmail.Location = new Point(50, 65);
            txtEmail.Name = "txtEmail";
            txtEmail.Size = new Size(128, 23);
            txtEmail.TabIndex = 1;
            // 
            // btnLogin
            // 
            btnLogin.Location = new Point(222, 12);
            btnLogin.Name = "btnLogin";
            btnLogin.Size = new Size(147, 184);
            btnLogin.TabIndex = 2;
            btnLogin.Text = "Login";
            btnLogin.UseVisualStyleBackColor = true;
            btnLogin.Click += btnLogin_Click;
            // 
            // btnGoMain
            // 
            btnGoMain.Location = new Point(296, 326);
            btnGoMain.Name = "btnGoMain";
            btnGoMain.Size = new Size(170, 104);
            btnGoMain.TabIndex = 3;
            btnGoMain.Text = "Mainpage";
            btnGoMain.UseVisualStyleBackColor = true;
            btnGoMain.Click += btnGoMain_Click;
            // 
            // LoginForm
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(btnGoMain);
            Controls.Add(btnLogin);
            Controls.Add(txtEmail);
            Controls.Add(txtPassword);
            Name = "LoginForm";
            Text = "Login Form";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private TextBox txtPassword;
        private TextBox txtEmail;
        private Button btnLogin;
        private Button btnGoMain;
    }
}
