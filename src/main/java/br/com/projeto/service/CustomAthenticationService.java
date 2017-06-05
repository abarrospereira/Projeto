package br.com.projeto.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.projeto.domain.Profile;

@Service
@Transactional
public class CustomAthenticationService {

	//get user from the database, via Hibernate
	 @Autowired
	private UserService userDao;

	public UserDetails loadUserByUsername(final String username)
		throws UsernameNotFoundException {

		br.com.projeto.domain.User user = userDao.findByUserName(username);
		
		if (user == null) {
			return null;
        }
		
		List<GrantedAuthority> authorities =
                                      buildUserAuthority(user.getProfiles());

		return buildUserForAuthentication(user, authorities);

	}

	// Converts com.mkyong.users.model.User user to
	// org.springframework.security.core.userdetails.User
	private User buildUserForAuthentication(br.com.projeto.domain.User user,
		List<GrantedAuthority> authorities) {
		return new User(user.getUsername(), user.getPassword(),
			user.isEnabled(), true, true, true, authorities);
	}

	private List<GrantedAuthority> buildUserAuthority(Set<Profile> profiles) {

		Set<GrantedAuthority> setAuths = new HashSet<GrantedAuthority>();

		// Build user's authorities
		for (Profile profile : profiles) {
			setAuths.add(new SimpleGrantedAuthority(profile.getName()));
		}

		List<GrantedAuthority> Result = new ArrayList<GrantedAuthority>(setAuths);

		return Result;
	}

}