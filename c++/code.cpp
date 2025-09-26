#include <iostream>
#include <string>
#include <vector>
#include <cctype>
using namespace std;

string caesarEncrypt(string t, int k) {
    string res="";
    for(char c : t){
        if(isalpha(c)){
            char base = isupper(c) ? 'A' : 'a';
            res += char((c - base + k) % 26 + base);
        } else res += c;
    }
    return res;
}
string caesarDecrypt(string t, int k) {
    return caesarEncrypt(t, 26-k);
}

int modInverse(int a, int m) {
    for(int x=1;x<m;x++)
        if((a*x)%m==1) return x;
    return -1;
}
string affineEncrypt(string t, int a, int b) {
    string res="";
    for(char c : t){
        if(isalpha(c)){
            char base = isupper(c)?'A':'a';
            res += char((a*(c-base)+b)%26 + base);
        } else res += c;
    }
    return res;
}
string affineDecrypt(string t, int a, int b) {
    string res="";
    int inv = modInverse(a,26);
    for(char c : t){
        if(isalpha(c)){
            char base = isupper(c)?'A':'a';
            res += char((inv*((c-base)-b+26))%26 + base);
        } else res += c;
    }
    return res;
}

string permutationEncrypt(string t, vector<int> key) {
    string res="";
    int n=key.size();
    for(int i=0;i<t.size();i+=n){
        for(int k : key){
            if(i+k < t.size()) res+=t[i+k];
        }
    }
    return res;
}
string permutationDecrypt(string t, vector<int> key) {
    int n=key.size();
    string res(t.size(),' ');
    for(int i=0;i<t.size();i+=n){
        for(int j=0;j<n && i+j<t.size();j++){
            res[i+key[j]] = t[i+j];
        }
    }
    return res;
}
string vigenereEncrypt(string t,string key){
    string res="";
    int m=key.size();
    for(int i=0;i<t.size();i++){
        char c=t[i];
        if(isalpha(c)){
            char base = isupper(c)?'A':'a';
            int k = tolower(key[i%m])-'a';
            res += char((c-base+k)%26+base);
        } else res+=c;
    }
    return res;
}
string vigenereDecrypt(string t,string key){
    string res="";
    int m=key.size();
    for(int i=0;i<t.size();i++){
        char c=t[i];
        if(isalpha(c)){
            char base = isupper(c)?'A':'a';
            int k = tolower(key[i%m])-'a';
            res += char((c-base-k+26)%26+base);
        } else res+=c;
    }
    return res;
}
string formatKey(string key){
    string res="";
    vector<bool> used(26,false);
    for(char c: key){
        if(isalpha(c)){
            c=tolower(c);
            if(c=='j') c='i';
            if(!used[c-'a']){
                used[c-'a']=true;
                res+=c;
            }
        }
    }
    for(char c='a';c<='z';c++){
        if(c=='j') continue;
        if(!used[c-'a']) res+=c;
    }
    return res;
}
vector<string> buildMatrix(string key){
    string k=formatKey(key);
    vector<string> mat(5,string(5,' '));
    for(int i=0;i<25;i++){
        mat[i/5][i%5]=k[i];
    }
    return mat;
}
pair<int,int> findPos(vector<string>& mat,char c){
    if(c=='j') c='i';
    for(int i=0;i<5;i++)
        for(int j=0;j<5;j++)
            if(mat[i][j]==c) return {i,j};
    return {-1,-1};
}
string playfairEncrypt(string t,string key){
    vector<string> mat=buildMatrix(key);
    string s="";
    for(char c:t) if(isalpha(c)) s+=tolower(c);
    for(int i=0;i<s.size();i+=2){
        if(i==s.size()-1 || s[i]==s[i+1]) s.insert(i+1,1,'x');
    }
    string res="";
    for(int i=0;i<s.size();i+=2){
        auto [r1,c1]=findPos(mat,s[i]);
        auto [r2,c2]=findPos(mat,s[i+1]);
        if(r1==r2){
            res+=mat[r1][(c1+1)%5];
            res+=mat[r2][(c2+1)%5];
        }else if(c1==c2){
            res+=mat[(r1+1)%5][c1];
            res+=mat[(r2+1)%5][c2];
        }else{
            res+=mat[r1][c2];
            res+=mat[r2][c1];
        }
    }
    return res;
}
string playfairDecrypt(string t,string key){
    vector<string> mat=buildMatrix(key);
    string res="";
    for(int i=0;i<t.size();i+=2){
        auto [r1,c1]=findPos(mat,t[i]);
        auto [r2,c2]=findPos(mat,t[i+1]);
        if(r1==r2){
            res+=mat[r1][(c1+4)%5];
            res+=mat[r2][(c2+4)%5];
        }else if(c1==c2){
            res+=mat[(r1+4)%5][c1];
            res+=mat[(r2+4)%5][c2];
        }else{
            res+=mat[r1][c2];
            res+=mat[r2][c1];
        }
    }
    return res;
}

int main(){
    while(true){
        string text,keyStr,result;
        int choice,act,a,b;

        cout<<"\n===== MENU =====\n";
        cout<<"0. Thoat\n";
        cout<<"1. Caesar\n";
        cout<<"2. Affine\n";
        cout<<"3. Hoan vi\n";
        cout<<"4. Vigenere\n";
        cout<<"5. Playfair\n";
        cout<<"Lua chon: ";
        cin>>choice;
        if(choice==0) break;

        cout<<"Ban muon lam gi? (1.Ma hoa, 2.Giai ma): ";
        cin>>act;
        cin.ignore();

        cout<<"Nhap chuoi can xu ly: ";
        getline(cin,text);

        switch(choice){
            case 1: {
                cout<<"Nhap khoa k: "; cin>>a;
                result = (act==1)?caesarEncrypt(text,a):caesarDecrypt(text,a);
                break;
            }
            case 2: {
                cout<<"Nhap khoa a (nguyen to cung 26): "; cin>>a;
                cout<<"Nhap khoa b: "; cin>>b;
                result = (act==1)?affineEncrypt(text,a,b):affineDecrypt(text,a,b);
                break;
            }
            case 3: {
                int n; cout<<"Nhap do dai khoa n: "; cin>>n;
                vector<int> key(n);
                cout<<"Nhap khoa hoan vi (0.."<<n-1<<"): ";
                for(int i=0;i<n;i++) cin>>key[i];
                result = (act==1)?permutationEncrypt(text,key):permutationDecrypt(text,key);
                break;
            }
            case 4: {
                cout<<"Nhap khoa chuoi: "; cin>>keyStr;
                result = (act==1)?vigenereEncrypt(text,keyStr):vigenereDecrypt(text,keyStr);
                break;
            }
            case 5: {
                cout<<"Nhap khoa chuoi: "; cin>>keyStr;
                result = (act==1)?playfairEncrypt(text,keyStr):playfairDecrypt(text,keyStr);
                break;
            }
            default: result="Lua chon sai!";
        }

        cout<<">> Ket qua: "<<result<<"\n";
    }
    return 0;
}
